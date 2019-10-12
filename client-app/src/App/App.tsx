import React, { useEffect, useState } from 'react';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../Features/activities/dashboard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities')
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <div>
      <Header />
      <Container style={{ marginTop: '6rem' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </div>
  )
};

export default App;