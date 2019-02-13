import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserList from './UserList'
import UserRegistrationForm from './RegistrationForm'
import UpdateForm from './UpdateForm'
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={UserList} />
        <Route exact path="/user/list" component={UserList} /> 
        <Route exact path="/user/add" component={UserRegistrationForm} /> 
        <Route exact path="/user/update/:id" component={UpdateForm} /> 
      </div>
    );
  }
}

export default App;

