import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';

interface IProps {
}

const ActivityDetails: React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);
  const { closeForm, selectedActivity: activity, openEditForm } = activityStore;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group width={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => openEditForm(activity!.id)}
          />
          <Button
            basic
            color="grey"
            content="Close"
            onClick={closeForm}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
