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

  return (
    <li className="nav-item" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
        Notes
      </Link>
      {isOpen && (
        <div className="dropdown-menu show" style={{position: 'absolute'}}>
          <Link className={`dropdown-item ${location.pathname === "/notes" ? "disabled" : ""}`} to="/notes">All notes</Link>
          <Link className={`dropdown-item ${location.pathname === "/notes/create" ? "disabled" : ""}`} to="/notes/create">Create Note</Link>
          <Link className={`dropdown-item ${location.pathname === "/notes/archive" ? "disabled" : ""}`} to="/notes/archive">Archived</Link>
        </div>
      )}
    </li>
  );
};

export default NotesDropdown;