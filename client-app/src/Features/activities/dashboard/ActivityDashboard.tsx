import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import ActivityStore from '../../../App/Stores/activityStore';
import LoadingComponent from '../../../App/Api/Layout/LoadingComponent';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading Activities..." inverted />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
