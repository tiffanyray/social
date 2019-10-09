import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';

export const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
          <Menu.Item name='Social' />
          <Menu.Item
            name='Activities'
          />
          <Menu.Item>
            <Button positive content="Create Activity" />
          </Menu.Item>
      </Container>
    </Menu>
  );
};
