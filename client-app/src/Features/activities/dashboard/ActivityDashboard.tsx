import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { ActivityList } from '../dashboard';
import { ActivityDetails } from '../details/ActivityDetails';

interface IProps {
  activities: IActivity[]
}

export const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetails />
      </Grid.Column>
    </Grid>
  )
};
