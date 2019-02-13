import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableRow from './components/TableRow'


class UserList extends Component {

  constructor(props) {
    super(props)
    this.state = { users: [] };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/users/')
      .then(response => {
        this.setState({ users: response.data.data });
        //console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  removeUser = (id) => {
    
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      
      var users = this.state.users.filter(function (user) { return user.id !== id });
      this.setState({ users: users });
  }

  tabRow() {
    return this.state.users.map((user, i) => {
      return <TableRow 
                  user={user} 
                  key={i} 
                  onDelete = { id => this.removeUser(id)}
              />;
    });
  }

  render() {
    return (
      <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">User List Form</h2>
              <h3 className="title" >
                <Link to="/user/add">Add New User</Link>
              </h3>
            </div>
            <div className="card-body container">
              <table className="table" border="1">
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Last Name</td>
                    <td>First Name</td>
                    <td>Gender</td>
                    <td>Active Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {this.tabRow()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UserList;