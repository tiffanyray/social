import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailProps {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({ match }) => {
  const blankActivity = {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: '',
  };

  const activityStore = useContext(ActivityStore);
  const { createActivity, clearActivity, closeForm, editActivty, activity: selectedActivity, submitting, loadActivity } = activityStore;

  const [activity, setActivity] = useState<IActivity>(blankActivity);

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
      editActivty(activity);
    }
  };

  useEffect(() => {
    if (match.params.id) {
      loadActivity(match.params.id)
        .then(() => {
          selectedActivity && setActivity(selectedActivity);
        });
    }

    return () => {
      clearActivity();
    };
  }, [selectedActivity, clearActivity, match.params.id, selectedActivity]);

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