import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import LoadingInitial from '../../../App/Api/Layout/LoadingComponent';
import ActivityStore from '../../../App/Stores/activityStore';

interface DetailParams {
  id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ history, match }) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);

  if (loadingInitial || !activity) return <LoadingInitial content="Loading..." />;

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
            as={Link}
            to={`/manage/${activity.id}`}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => history.push('/activities')}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
