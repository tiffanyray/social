import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';

interface DetailProps {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({ match, history }) => {
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
  const {
    createActivity,
    clearActivity,
    editActivty,
    activity: selectedActivity,
    submitting,
    loadActivity,
  } = activityStore;

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
      createActivity(newActivity)
        .then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      editActivty(activity)
        .then(() => history.push(`/activities/${activity.id}`));
    }
  };

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id)
        .then(() => {
          if (selectedActivity) setActivity(selectedActivity);
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
          onClick={() => history.push('/activities')}
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
