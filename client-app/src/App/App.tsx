import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../Features/activities/dashboard';
import { LoadingComponent } from '../App/Api/Layout/LoadingComponent';
import agent from './Api/agent';


const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  let [editForm, setEditForm] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(true);
  let [submitting, setSubmitting] = useState<boolean>(false);
  let [target, setTarget] = useState('');

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const openCreateForm = () => {
    setSelectedActivity(null);
    setEditForm(true);
  };

  const createActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditForm(false);
      })
      .then(() => setSubmitting(false))
      .catch(err => {
        console.error(err);
      })
  };

  const editActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditForm(false);
      })
      .then(() => setSubmitting(false))
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteActivity = (id: string, event: SyntheticEvent<HTMLButtonElement>) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false))
      .catch(err => {
        console.error(err);
      })
  };

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        })
        setActivities(activities);
      })
      .then(() => setLoading(false))
      .catch(err => console.error(err));
  }, []);

  if (loading) return <LoadingComponent content="Loading Activities..." inverted />

  return (
    <div>
      <Header openForm={openCreateForm} />
      <Container style={{ marginTop: '6rem' }}>
        <ActivityDashboard
          activities={activities}
          createActivity={createActivity}
          editForm={editForm}
          editActivity={editActivity}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          selectedActivity={selectedActivity}
          setEditForm={setEditForm}
          setSelectedActivity={setSelectedActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  )
};

export default App;