import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Header from '../features/Navigation/Header';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import HomePage from '../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';
import ActivityDetails from '../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => (
  <>
    <Route path="/" component={HomePage} exact />
    <Route
      path="/(.+)"
      render={() => (
        <>
          <Header />
          <Container style={{ marginTop: '6rem' }}>
            <Route path="/activities" component={ActivityDashboard} exact />
            <Route path="/activities/:id" component={ActivityDetails} />
            <Route key={location.key} path={['/createForm', '/manage/:id']} component={ActivityForm} />
          </Container>
        </>
      )}
    />
  </>
);

export default withRouter(observer(App));
