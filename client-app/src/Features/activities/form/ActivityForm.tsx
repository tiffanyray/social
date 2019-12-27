import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import {
  Segment, Form, Button, Grid,
} from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../Core/form/TextInput';
import TextAreaInput from '../../../Core/form/TextAreaInput';
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

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     const newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity)
  //       .then(() => history.push(`/activities/${newActivity.id}`));
  //   } else {
  //     editActivty(activity)
  //       .then(() => history.push(`/activities/${activity.id}`));
  //   }
  // };

  const onFinalFormSubmit = (values: any) => {
    console.log(values);
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
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={onFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  value={activity.title}
                  placeholder="Title"
                  component={TextInput}
                />
                <Field
                  name="description"
                  value={activity.description}
                  placeholder="Description"
                  rows="3"
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  value={activity.category}
                  placeholder="Category"
                  component={TextInput}
                />
                <Field
                  name="date"
                  value={activity.date}
                  placeholder="Date"
                  component={TextInput}
                />
                <Field
                  name="city"
                  value={activity.city}
                  placeholder="City"
                  component={TextInput}
                />
                <Field
                  name="venue"
                  value={activity.venue}
                  placeholder="Venue"
                  component={TextInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
