import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../App/Models/activity';
import ActivityStore from '../../../App/Stores/activityStore';

interface IProps {
  setEditForm: (edit: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ setEditForm, setSelectedActivity }) => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity: activity } = activityStore;

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
            onClick={() => setEditForm(true)}
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
  );
};

export default observer(ActivityDetails);
