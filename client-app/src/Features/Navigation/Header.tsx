import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';

const Header: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  return <Menu fixed="top" inverted>
    <Container>
      <Menu.Item name="Social" />
      <Menu.Item name="Activities" />
      <Menu.Item>
        <Button
          positive
          content="Create Activity"
          onClick={activityStore.openCreateForm}
        />
      </Menu.Item>
    </Container>
  </Menu>
};

export default observer(Header);