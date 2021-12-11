import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alertAction";
import { register } from "../../actions/authAction";
import PropTypes from 'prop-types';
import authReducer from "../../reducers/authReducer";


const Register = ({isAuth, register}) => {

const [ formData, setFormData ] = useState({

  name: '',
  email: '',
  password: ''

});

const { name, email, password } = formData;

const onChange = event => {

  setFormData({

    ...formData,
    [event.target.name]: event.target.value
  })
}

const onSubmit =  event => {

  event.preventDefault();

 register({ name, email, password });
  
}

// Redirect if we register
if(isAuth) {

  return(

    <Redirect to="/dashboard" />
  )
}

return (

  <React.Fragment>
    <div className="card">
   <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={event => onSubmit(event)} action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Name" value={ name } onChange={event => onChange(event)} name="name"   />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={ email } onChange={event => onChange(event)} name="email"  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            
            value={ password }
            onChange={event => onChange(event)}
            //required
          />
        </div>
        {/* <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div> */}
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p class="my-1">
        Already have an account? <Link to="/register">Sign In</Link>
      </p>
      </div>
  </React.Fragment>

);
};

Register.propTypes = {

  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
}

const mapStateToProps = state => ({

   isAuth: state.auth.isAuth
})

  


export default connect(mapStateToProps, {setAlert, register}) (Register);
