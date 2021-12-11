import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
import PropTypes from 'prop-types';

 const Login = ({ login, isAuth }) => {

const [ formData, setFormData ] = useState({

  email: '',
  password: ''
})

const { email, password } = formData;

const onChange = event  => {

  setFormData({

    ...formData,
  [event.target.name]: event.target.value

  })

}

const onSubmit = event => {

  event.preventDefault();

  login(email, password);
}


// Redirect if we logged in
if(isAuth) {

  return(

    <Redirect to="/dashboard" />

  )
}


    return (
        
        <React.Fragment>
          <div className="card">
          {/* <div class="alert alert-danger">
        Invalid credentials
      </div> */}
      <h1 class="large text-primary">Sign In</h1>
      <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
      <form class="form" onSubmit={event => onSubmit(event)} action="dashboard.html">
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={event => onChange(event)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={ password }
            onChange={event => onChange(event)}
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to="/login">Sign Up</Link>
      </p>
      </div> 
      </React.Fragment>

    )
}

Login.propTypes = {

  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
  
}

const mapStateToProps = state => ({

  isAuth: state.auth.isAuth
})



export default connect(mapStateToProps, { login }) (Login);

