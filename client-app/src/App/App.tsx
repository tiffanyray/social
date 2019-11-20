import React, {
  useContext, useEffect, useState, SyntheticEvent,
} from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Header from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import ActivityDashboard from '../Features/activities/dashboard/ActivityDashboard';
import LoadingComponent from '../App/Api/Layout/LoadingComponent';
import agent from './Api/agent';
import ActivityStore from './Stores/activityStore';

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null,
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [target, setTarget] = useState('');

  const deleteActivity = (
    id: string,
    event: SyntheticEvent<HTMLButtonElement>,
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." inverted />;

  return (
    <div>
      <Header />
      <Container style={{ marginTop: '6rem' }}>
        <ActivityDashboard
          deleteActivity={deleteActivity}
          selectedActivity={selectedActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  );
};

export default observer(App);
