import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    users: []
  }
  
  componentDidMount() {
    axios.get('https://localhost:5001/users')
    .then(response => {
      this.setState({
        users: response.data
      });
    });
  }

  render() {
    return (
      <div className="">
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Social</Header.Content>
        </Header>
          <p>Hello</p>
          {this.state.users.map((user : any) => (
            <List>
              <List.Item>{user.id}</List.Item>
              <List.Item>{user.name}</List.Item>
            </List>
          ))}
          
      </div>
    );
  }
}

export default App;
