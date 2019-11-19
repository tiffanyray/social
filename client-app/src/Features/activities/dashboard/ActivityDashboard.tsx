import React, { SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import { IActivity } from '../../../App/Models/activity';
import ActivityDetails from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import ActivityStore from '../../../App/Stores/activityStore';

interface IProps {
  activities: IActivity[];
  createActivity: (activity: IActivity) => void;
  selectedActivity: IActivity | null;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  selectActivity: (id: string) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  setEditForm: (edit: boolean) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  createActivity,
  deleteActivity,
  selectActivity,
  editActivity,
  setSelectedActivity,
  setEditForm,
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
          <ActivityDetails
            setEditForm={setEditForm}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {selectedActivity && editForm && (
          <ActivityForm
            setEditForm={setEditForm}
            selectedActivity={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
