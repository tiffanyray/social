import React, { useEffect, useState } from 'react';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../Features/activities/dashboard';
import agent from './Api/agent';


const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  let [editForm, setEditForm] = useState<boolean>(false);

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const openCreateForm = () => {
    setSelectedActivity(null);
    setEditForm(true);
  };

  const createActivity = (activity: IActivity) => {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditForm(false);
    })
    .catch(err => {
      console.error(err);
    })
  };

  const editActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditForm(false);
  };

  const deleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
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
  }, []);

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
        />
      </Container>
    </div>
  )
};

export default App;