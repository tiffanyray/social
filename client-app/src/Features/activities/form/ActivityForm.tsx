import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
}

const ActivityForm: React.FC<IProps> = () => {
  const initializeActivity = () => {
    if (selectedActivity !== undefined) {
      return selectedActivity;
    } else {
      return {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: '',
      }
    }
  }

  const activityStore = useContext(ActivityStore);
  const { createActivity, closeForm, editActiivty, selectedActivity, submitting } = activityStore;

  const [activity, setActivity] = useState<IActivity>(initializeActivity);

  const onChange = (type: string) => (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity({ ...activity, [type]: event.currentTarget.value });
  };

  const onSubmit = () => {
    if (activity.id.length === 0) {
      const newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActiivty(activity);
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
          onClick={closeForm}
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
  );
};

export default observer(ActivityForm);