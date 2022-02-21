import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginSignup from '../auth/LoginSignup';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav>
      <ul className='site-options'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Our Spot
          </NavLink>
          <NavLink to='/parks' exact={true} activeClassName='active'>
            Explore
          </NavLink>
        </li>
      </ul>
      <ul className='user-options'>
          {(user) ? <NavLink className='logged-in' to={`/users/${user.id}`}>Hey, {user.username}!</NavLink> : ''}
          {(user) ? <div className='logged-in'></div> : ''}
          {(user) ? <LogoutButton /> : <LoginSignup />}
        </ul>
    </nav>
  );
}

export default NavBar;
