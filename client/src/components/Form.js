import React from 'react'
import '../theme/css/main.min.css'

const MyForm = (props) => {
  const {user = {}} = props;
  return (
    <div>
      <div className="form-row m-b-55">
        <div className="name">Name</div>
        <div className="value">
          <div className="row row-space">
            <div className="col-2">
              <div className="input-group-desc">
                <input
                  className="input--style-5"
                  type="text"
                  name="firstName"
                  placeholder={user.firstName}
                  onChange = {e => props.onChange('firstName', e.target.value)}
                />
                <label className="label--desc">first name</label>
              </div>
            </div>
            <div className="col-2">
              <div className="input-group-desc">
                <input
                  className="input--style-5"
                  type="text"
                  name="lastName"
                  placeholder={user.lastName}
                  onChange={e => props.onChange('lastName', e.target.value)}
                />
                <label className="label--desc">last name</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-row p-t-20">
        <div className="col-2">
          <label className="label label--block">Want to keep active the user ?</label>
            <div className="p-t-15">
              <label className="radio-container m-r-55">Yes
                <input 
                  type="radio"  
                  name="isActive"
                  checked={user.isActive === undefined ? true : user.isActive}
                  onChange={e => props.onChange('isActive', true)}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio-container">No
                <input 
                  type="radio" 
                  name="isActive"
                  checked={user.isActive === undefined ? false : !user.isActive}
                  onChange={e => props.onChange('isActive', false)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
        </div>
        <div className="col-2">
          <label className="label label--block">Gender</label>
            <div className="p-t-15">
              <label className="radio-container m-r-55">Male
                <input 
                  type="radio" 
                  name="gender" 
                  checked={user.gender === undefined ? false : !user.gender}
                  onChange={e => props.onChange('gender',false)}
                />
                <span className="checkmark"></span>
              </label>
              <label className="radio-container">Female
                <input 
                  type="radio" 
                  name="gender"
                  checked={user.gender === undefined ? false : user.gender}
                  onChange={e => props.onChange('gender',true)}
                />
                <span className="checkmark"></span>
              </label>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MyForm;

