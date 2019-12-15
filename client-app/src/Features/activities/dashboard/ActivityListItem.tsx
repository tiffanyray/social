import React from 'react';
import {
  Item, Button, Label, Segment, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../App/Models/activity';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => (
  <Segment.Group>
    <Segment>
      <Item.Group>
        <Item key={activity.id}>
          <Item.Image size="tiny" circular src="assets/user.png"></Item.Image>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Description>
              Hosted by Tiffany
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment>
      <Icon name="clock" />
      {activity.date}
      <br />
      <Icon name="marker" />
      {activity.venue}
      {' , '}
      {activity.city}
    </Segment>
    <Segment secondary>
      Attendees will go here
    </Segment>
    <Segment clearing>
      <span>{activity.description}</span>
      <Button
        as={Link}
        to={`/activities/${activity.id}`}
        floated="right"
        content="View"
        color="blue"
      />
    </Segment>
  </Segment.Group>
);

export default observer(ActivityListItem);
