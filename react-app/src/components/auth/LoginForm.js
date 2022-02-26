import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { demoLogin, login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();

    const loginErrors = [];
    const regExp = /[a-zA-Z0-9!@#$%^&*()_+:?/,><\|]/g;

    if (email.length === 0) loginErrors.push('Email must not be left blank');
    if (!email.includes('@') && !email.includes('.')) loginErrors.push('Valid email address format required')
    if (!regExp.test(email)) loginErrors.push('Email must include valid content');

    if (password.length === 0) loginErrors.push('Password must not be left blank');

    if (loginErrors.length > 0) {
      setErrors(loginErrors);
    } else {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(['Credentials are incorrect. Please try again.']);
      }
    }

  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page'>
      <div className='login-content'>
        <h2>Login</h2>
        <form onSubmit={onLogin} className='login-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              required
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit' className='login-button'>Login</button>
          <button className='demo-login-button' onClick={e => dispatch(demoLogin())}>Demo</button>
        </form>
      </div>
      <div>
        <img className='home-image' src='https://res.cloudinary.com/jenn/image/upload/v1645572949/our-spot/Untitled_Artwork_3_myamif.png' alt='park' />
      </div>
    </div>
  );
};

export default LoginForm;
