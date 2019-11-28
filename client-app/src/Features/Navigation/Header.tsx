import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../App/Stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  return <Menu fixed="top" inverted>
    <Container>
      <Menu.Item name="Social"
        as={NavLink}
        to="/"
        exact
      />
      <Menu.Item
        name="Activities"
        as={NavLink}
        to="/activities"
      />
      <Menu.Item>
        <Button
          positive
          content="Create Activity"
          as={Link}
          to="/createForm"
        />
      </Menu.Item>
    </Container>
  </Menu>
};

export default observer(Header);