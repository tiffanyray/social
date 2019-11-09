import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';

interface IProps {
  activities: IActivity[],
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  selectActivity: (id: string) => void;
  setEdit: (edit: boolean) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  deleteActivity,
  selectActivity,
  setEdit,
  submitting,
  target
}) => {
  return (
    <Segment clearing >
      <Item.Group divided>

        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={(event) => {
                    setEdit(false);
                    deleteActivity(activity.id, event)
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={target === activity.id && submitting}
                  name={activity.id}
                />
                <Button
                  onClick={() => {
                    setEdit(false);
                    selectActivity(activity.id)
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
  )
};
