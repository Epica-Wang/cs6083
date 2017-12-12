import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import './SignupForm.css';

const SignupForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => (
    <div className="container">
      <h1></h1>
    <div className="card-panel signup-panel">
      <form className="col s12" action="/" onSubmit={onSubmit}>
        <h4 className="center-align">Sign Up</h4>
        {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}
        <div className="row">
          <div className="input-field col s12">
            <input id="username" name="username" type='text' className="validate" onChange={onChange}/>
            <label htmlFor="username">Username</label>
          </div>
        </div>
        {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}

        <div className="row">
          <div className="input-field col s12">
            <input id="firstname" name="firstname" type='text' className="validate" onChange={onChange}/>
            <label htmlFor="firstname">First name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="lastname" name="lastname" type='text' className="validate" onChange={onChange}/>
            <label htmlFor="lastname">Last name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" name="email" type='email' className="validate" onChange={onChange}/>
            <label htmlFor="email">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" name="password" className="validate" onChange={onChange}/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
        <div className="row">
          <div className="input-field col s12">
            <input id="confirm_password" type="password" name="confirm_password" className="validate" onChange={onChange}/>
            <label htmlFor="confirm_password">Confirm Password</label>
          </div>
        </div>
        <div className="row right-align">
          <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Sign Up'/>
        </div>
        <div className="row">
          <p className="right-align"> Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  </div>
);

SignupForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignupForm;
