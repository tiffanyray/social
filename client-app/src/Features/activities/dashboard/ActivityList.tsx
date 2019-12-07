import React, { useContext } from 'react';
import {
  Item, Button, Label, Segment,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ActivityStore from '../../../App/Stores/activityStore';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate, deleteActivity, submitting, target,
  } = activityStore;

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
                  as={Link}
                  to={`/activities/${activity.id}`}
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
