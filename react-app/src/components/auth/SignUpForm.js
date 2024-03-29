import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { demoLogin, signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const signupErrors = [];
    const regExp = /[a-zA-Z0-9!@#$%^&*()_+:?/,><\|]/g;

    if (username.length === 0) signupErrors.push('Username must not be left blank');
    if (username.length > 40) signupErrors.push('Username must not be greater than 40 characters');
    if (!regExp.test(username)) signupErrors.push('Username must include valid content');

    if (email.length === 0) signupErrors.push('Email must not be left blank');
    if (!email.includes('@') && !email.includes('.')) signupErrors.push('Valid email address format required')
    if (!regExp.test(email)) signupErrors.push('Email must include valid content');

    if (password.length === 0) signupErrors.push('Password must not be left blank');
    if (password !== repeatPassword) signupErrors.push('Passwords must match');

    if (signupErrors.length > 0) {
      setErrors(signupErrors);
    } else {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }

    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-page'>
      <div className='signup-content'>
        <h2>Signup</h2>
        <form onSubmit={onSignUp} className='signup-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
          <div>
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeat_password'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit' className='signup-button'>Sign Up</button>
          <button className='demo-login-button' onClick={e => dispatch(demoLogin())}>Demo</button>
        </form>
      </div>
      <div>
        <img className='home-image' src='https://res.cloudinary.com/jenn/image/upload/v1645572949/our-spot/Untitled_Artwork_3_myamif.png' alt='park' />
      </div>
    </div>
  );
};

export default SignUpForm;
