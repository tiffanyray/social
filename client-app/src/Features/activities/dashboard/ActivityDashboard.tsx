import React, { SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import { IActivity } from '../../../App/Models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityStore from '../../../App/Stores/activityStore';

interface IProps {
  selectedActivity: IActivity | null;
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  deleteActivity,
  submitting,
  target,
}) => {
  const activityStore = useContext(ActivityStore);
  const { editForm, selectedActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editForm && (
          <ActivityDetails />
        )}
        {editForm && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
