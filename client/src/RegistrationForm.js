import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyForm from './components/Form'
import axios from 'axios';


class RegistrationForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "",
        lastName: "",
        isActive: '',
        gender: ''
      }
    }
  }

  addUser = () => {
    const data = this.state.user;
    
    axios.post('http://localhost:3000/users/', data)
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  stateHandler(field , v) {
    const mysource = { ...this.state.user }
    console.log('radio', field, v, typeof v);
    mysource[field] = v;
    this.setState(
      { user: mysource }
    )
  }

  render() {
    return (
      <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">User Registration Form</h2>
              <h3 className="title" >
                <Link to="/user/list">Show User List</Link>
              </h3>
            </div>
            <div className="card-body">
              <form>
                <MyForm
                  onChange={(field, v) => this.stateHandler(field, v)}
                ></MyForm>
                <div>
                  <button className="btn btn--radius-2 btn--red" onClick={this.addUser} type="button" >Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default RegistrationForm;