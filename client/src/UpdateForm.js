import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyForm from './components/Form'


class UpdateForm extends Component {

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

  componentDidMount() {
    axios.get('http://localhost:3000/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({ user: response.data.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  updateUser = async () => {
    const data = this.state.user;
    const fpt = this;
    // console.log(data)
    await axios.put(`http://localhost:3000/users/${data.id}`, data)
      .then(function (response) {
        //handle success
        console.log(response);
        fpt.props.history.push('/user/list');
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  stateHandler(field, v) {
    const mysource = { ...this.state.user }
    //console.log('raadio', field, v, typeof v);
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
              <h2 className="title">User Info Update Form</h2>
              <h3 className="title" >
                <Link to="/user/add">Add New User</Link>
              </h3>
              <h3 className="title" >
                <Link to="/user/list">Show User List</Link>
              </h3>
            </div>
            <div className="card-body">
              <form>
                <MyForm
                  user={this.state.user}
                  onChange={(field, v) => this.stateHandler(field, v)}
                ></MyForm>
                <div>
                  <button className="btn btn--radius-2 btn--red" onClick={this.updateUser} type="button" >Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default UpdateForm;
