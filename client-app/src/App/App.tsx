import React, { useEffect, useState } from 'react';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../Features/activities/dashboard';


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
    setActivities([ ...activities, activity ]);
    setSelectedActivity(activity);
    setEditForm(false);
  };

  const editActivity = (activity: IActivity) => {
    setActivities([ ...activities.filter(a => a.id !== activity.id), activity ]);
    setSelectedActivity(activity);
    setEditForm(false);
  };

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities')
      .then(response => {
        setActivities(response.data);
      });
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