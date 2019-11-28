import React, {
  useContext, useEffect
} from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../App/Stores/activityStore';
import Header from '../features/Navigation/Header';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from '../App/Api/Layout/LoadingComponent';
import { Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';
import ActivityDetails from '../features/activities/details/ActivityDetails';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." inverted />;

  return (
    <div>
      <Header />
      <Container style={{ marginTop: '6rem' }}>
        <Route path='/' component={HomePage} exact />
        <Route path='/activities' component={ActivityDashboard} exact />
        <Route path='/activities/:id' component={ActivityDetails} />
        <Route path={['/createForm', '/manage/:id']} component={ActivityForm} />
      </Container>
    </div>
  );
};

export default observer(App);
