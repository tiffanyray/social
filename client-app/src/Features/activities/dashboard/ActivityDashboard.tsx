import React, { SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { ActivityList } from '../dashboard';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  createActivity: (activity: IActivity) => void;
  selectedActivity: IActivity | null;
  editForm: boolean;
  editActivity: (activity: IActivity) => void;
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  selectActivity: (id: string) => void;
  setEditForm: (edit: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  submitting: boolean;
  target: string;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  createActivity,
  deleteActivity,
  selectActivity,
  selectedActivity,
  editForm,
  editActivity,
  setEditForm,
  setSelectedActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          setEdit={setEditForm}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editForm && (
          <ActivityDetails
            activity={selectedActivity}
            setEditForm={setEditForm}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editForm && (
          <ActivityForm
            setEditForm={setEditForm}
            activity={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  )
};
