import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../App/Models/activity';

interface IProps {
  activity: IActivity;
  setEdit: (edit: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails: React.FC<IProps> = ({ activity, setEdit, setSelectedActivity }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
      </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width={2}>
          <Button 
            basic 
            color="blue" 
            content="Edit" 
            onClick={() => setEdit(true)}  
          />
          <Button 
            basic 
            color="grey" 
            content="Close" 
            onClick={() => setSelectedActivity(null)}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
};
