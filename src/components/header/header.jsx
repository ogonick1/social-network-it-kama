import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './header.scss';
import logo from'./logo.png'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setAuthInfo, logOut } from './../profile/profileSlice';
import { Avatar } from '@mui/material';

const Header = () => {
const dispatch = useDispatch();
const login = useSelector((state) => state.profile.login)
useEffect(() => {
  dispatch(setAuthInfo());
}, [dispatch,login])

// const authMe = useSelector((state) => state.profile.authInfo)
return (
  <header className="header">
    <NavLink to="/"><img className='navbar__img' src={logo} alt="logo"></img></NavLink>
    <NavLink className='header_link' to="/">Home</NavLink>
    <NavLink className='header_link' to="/dialogs">Message</NavLink>
    <NavLink className='header_link' to="/profile">Profile</NavLink>
    <nav>search</nav>
    {login ? <NavLink className='header_link' to="/profile"><Avatar/></NavLink>  : <NavLink className='header_link' to="/login">Login</NavLink> }
    <button onClick={() => dispatch(logOut())}>log out</button>
    
  </header>
)
}
export default Header;