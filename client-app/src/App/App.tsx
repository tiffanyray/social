import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from '../Features/Navigation/Header';
import { IActivity } from './Models/activity';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';

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
      <Container>
        <List>
          {
            activities.map((activity) => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))
          }
        </List>
      </Container>
    </div>
  )
};

export default App;