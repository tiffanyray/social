import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
  activity: IActivity | null;
  setEditForm: (edit: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({ setEditForm, activity: initialActivity, createActivity, editActivity }) => {
  let [activity, setActivity] = useState<IActivity>(initialActivity || {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });

  const onChange = (type: string) => (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity({ ...activity, [type]: event.currentTarget.value })
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
          type="date"
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
        />
      </Form>
    </Segment>
  )
};