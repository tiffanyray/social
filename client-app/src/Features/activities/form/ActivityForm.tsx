import React, { useState, useEffect, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
  selectedActivity: IActivity | null;
  setEditForm: (edit: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditForm,
  selectedActivity: initialActivity,
  createActivity,
  editActivity,
  submitting
}) => {
  const blankActivity = {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  }

  let [activity, setActivity] = useState<IActivity>(initialActivity || blankActivity);

  useEffect(() => {
    if (initialActivity === null) {
      setActivity(blankActivity);
    } else {
      setActivity(initialActivity);
    }
  }, [initialActivity]);

  const onChange = (type: string) => (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity({ ...activity, [type]: event.currentTarget.value });
  };

  const onSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input
          value={activity.title}
          placeholder="Title"
          onChange={onChange('title')}
        />
        <Form.TextArea
          value={activity.description}
          placeholder="Description"
          rows={2}
          onChange={onChange('description')}
        />
        <Form.Input
          value={activity.category}
          placeholder="Category"
          onChange={onChange('category')}
        />
        <Form.Input
          value={activity.date}
          type="datetime-local"
          placeholder="Date"
          onChange={onChange('date')}
        />
        <Form.Input
          value={activity.city}
          placeholder="City"
          onChange={onChange('city')}
        />
        <Form.Input
          value={activity.venue}
          placeholder="Venue"
          onChange={onChange('venue')}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditForm(false)}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting}
        />
      </Form>
    </Segment>
  )
};