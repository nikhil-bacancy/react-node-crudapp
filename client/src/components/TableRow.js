import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component {
  

  render() {
    return (
      <tr>
        <td>
          {this.props.user.id}
        </td>
        <td>
          {this.props.user.lastName}
        </td>
        <td>
          {this.props.user.firstName}
        </td>
        <td>
          { (!this.props.user.gender) ? 'Male' : 'Female'}
        </td>
        <td>
          { (this.props.user.isActive) ? 'Active' : 'deActive'}
        </td>
        <td>
          <h4>
            <Link to={"/user/update/" + this.props.user.id}>Update</Link> 
            |
            <a onClick={e => this.props.onDelete(this.props.user.id)}>Delete</a>
          </h4>
        </td>
      </tr>
    );
  }
}

export default TableRow;

//{this.props.obj._id}