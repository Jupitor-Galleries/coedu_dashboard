import React, {useRef} from 'react'
import { FaTimes } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import logo from "../../assets/logo.png";
import { NavLink } from 'react-router-dom';

const Header = () => {

  const menuRef = useRef(null);
  const menuDetailsRef = useRef(null);
  const closeRef = useRef(null)

  const handleMenu = () => {
    menuDetailsRef.current.classList.toggle('none');
    menuRef.current.classList.toggle('none');
    closeRef.current.classList.toggle('none');
  }

  const closeMenu = () => {
    menuDetailsRef.current.classList.toggle('none');
    menuRef.current.classList.toggle('none');
    closeRef.current.classList.toggle('none');
  }

  return (
    <header className="header">
    <div className="logo">
      <NavLink className='ic' to="/">
        <img src={logo} alt="" />
      </NavLink>
    </div>
    <ul className="nav-elements desktop">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/">Usecases</NavLink>
      </li>
      <li>
        <NavLink to="/">Contact</NavLink>
      </li>
    </ul>

    <div className="flex-row nnn desktop">
      <NavLink
        id="nav-trial"
        className="btnlink2"
        to="/register"
      >
       Sign up
      </NavLink>
      <NavLink className="btnlink" to="/signin">
        Login
      </NavLink>
    </div>

    <nav className="navbar mobile">
      <li
        className="hamburger mobile"
        ref={menuRef}
        onClick={() => handleMenu()}
      >
        <IoMdMenu />
      </li>
      
    </nav>

    <ul className="nav-elements5 mobile none" ref={menuDetailsRef} >
    <li
        className="hamburger mobile none"
        ref={closeRef}
        onClick={() => closeMenu()}
      >
        <FaTimes />
      </li>
      <div className="logo">
      <NavLink className='ic' to="/">
        <img src={logo} alt="" />
      </NavLink>
    </div>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/">Usecases</NavLink>
      </li>
      <li>
        <NavLink to="/">Contact</NavLink>
      </li>
      <NavLink
        id="nav-trial"
        className="btnlink2"
        to="/register"
      >
        Sign up
      </NavLink>
      <NavLink className="btnlink" to="/signin">
        Login
      </NavLink>
    </ul>
  </header>
  )
}

export default Header