import React, { useEffect, useState } from 'react';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../Features/activities/dashboard';


const App = () => {
  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  let [edit, setEdit] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEdit(true);
  }

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities')
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <div>
      <Header openForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '6rem' }}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          edit={edit}
          setEdit={setEdit}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </div>
  )
};

export default App;