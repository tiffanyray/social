import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item
        name="Social"
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
          as={NavLink}
          to="/createForm"
        />
      </Menu.Item>
    </Container>
  </Menu>
);

export default observer(Header);
