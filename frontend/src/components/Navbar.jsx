import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesDropdown from './Dropdown';
import LoginDropdown from './LoginDropdown';
import { BotMessageSquare } from 'lucide-react';

const Navbar = (props) => {
  const location = useLocation();
  let toggleNote = false
  if(localStorage.getItem('authtoken')){
    toggleNote = true
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li> */}
            { toggleNote && <NotesDropdown />}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
          {/* <BotMessageSquare/> */}
          <LoginDropdown showAlert={props.showAlert}/>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;