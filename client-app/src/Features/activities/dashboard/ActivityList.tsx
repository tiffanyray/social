import React, { SyntheticEvent, useContext } from 'react';
import {
  Item, Button, Label, Segment,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';

interface IProps {
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  deleteActivity,
  submitting,
  target,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate, selectActivity } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>

        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}
,
                  {' '}
                  {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={(event) => {
                    deleteActivity(activity.id, event);
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={target === activity.id && submitting}
                  name={activity.id}
                />
                <Button
                  onClick={() => {
                    selectActivity(activity.id);
                  }}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}

      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
