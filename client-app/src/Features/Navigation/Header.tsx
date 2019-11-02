import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';

interface IProps {
  openForm: () => void;
}

export const Header: React.FC<IProps> = ({ openForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item name='Social' />
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button 
            positive 
            content="Create Activity" 
            onClick={openForm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
