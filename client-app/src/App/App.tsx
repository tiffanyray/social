import React from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import {
  Route, withRouter, RouteComponentProps, Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../Features/Navigation/Header';
import ActivityDashboard from '../Features/activities/dashboard/ActivityDashboard'
import HomePage from '../Features/home/HomePage';
import ActivityForm from '../Features/activities/form/ActivityForm';
import ActivityDetails from '../Features/activities/details/ActivityDetails';
import LoginForm from '../Features/user/LoginForm';
import NotFound from './Api/Layout/NotFound';

const App: React.FC<RouteComponentProps> = ({ location }) => (
  <>
    <ToastContainer position="bottom-right" />
    <Route path="/" component={HomePage} exact />
    <Route
      path="/(.+)"
      render={() => (
        <>
          <Header />
          <Container style={{ marginTop: '6rem' }}>
            <Switch>
              <Route
                path="/activities"
                component={ActivityDashboard}
                exact
              />
              <Route
                path="/activities/:id"
                component={ActivityDetails}
              />
              <Route
                key={location.key}
                path={['/createForm', '/manage/:id']}
                component={ActivityForm}
              />
              <Route path="/login" component={LoginForm} />
              <Route
                component={NotFound}
              />
            </Switch>
          </Container>
        </>
      )}
    />
  </>
);

export default withRouter(observer(App));
