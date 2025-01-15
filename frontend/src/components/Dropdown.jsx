import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };
  const style = {
    display: "block",
    position: "absolute",
    backgroundColor: 'white',
    width: '200px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding:' 8px 0',
    zIndex: '1000',
    marginTop: '8px',
    color:{}
  }
  
  return (
    <li className="nav-item" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
        Notes
      </Link>
      {isOpen && (
        <div className="dropdown-menu1 show" style={style}>
          <Link className={`dropdown-item ${location.pathname === "/notes" ? "disabled" : ""}`} to="/notes">All notes</Link>
          <Link className={`dropdown-item ${location.pathname === "/notes/create" ? "disabled" : ""}`} to="/notes/create">Create Note</Link>
          <Link className={`dropdown-item ${location.pathname === "/notes/archive" ? "disabled" : ""}`} to="/notes/archive">Archived</Link>
        </div>
      )}
    </li>
  );
};

export default NotesDropdown;