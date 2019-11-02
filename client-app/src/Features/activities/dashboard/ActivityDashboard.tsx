import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';
import { ActivityList } from '../dashboard';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
  activities: IActivity[];
  selectedActivity: IActivity | null;
  edit: boolean;
  selectActivity: (id: string) => void;
  setEdit: (edit: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({ activities, selectActivity, selectedActivity, edit, setEdit, setSelectedActivity }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList 
          activities={activities} 
          selectActivity={selectActivity} 
          setEdit={setEdit}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !edit && (
          <ActivityDetails 
            activity={selectedActivity} 
            setEdit={setEdit}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {edit && (
          <ActivityForm 
            setEdit={setEdit} 
            activity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  )
};
