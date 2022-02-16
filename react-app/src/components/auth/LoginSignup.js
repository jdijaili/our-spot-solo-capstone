import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginSignup = () => {
    return (
        <div className='login-signup'>
            <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>
            </li>
            <li>|</li>
            <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
            </li>
        </div>
    )
}

export default LoginSignup;
