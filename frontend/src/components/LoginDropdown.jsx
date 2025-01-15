import React, { useState, useEffect, useRef, useContext } from 'react';
import '../css/LoginDropdown.css';
import AuthContext from '../context/auth/authcontext.jsx';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = React.useRef();
  const { icon, mangeIcon } = useContext(AuthContext); // Get icon from context

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleDropdownMouseLeave = () => {
    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-container" ref={dropdownRef}>
      <div
        className="profile-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={icon ? `https://avatar.iran.liara.run/public/boy?username=${icon}` : '/user.png'} // Use the icon state
          alt="Profile"
          className="profile-image"
        />
      </div>

      {isOpen && (
        <div
          className="dropdown-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {!icon ? (
            <>
              <div className="dropdown-container d-flex">
                <Link to="/authway" className="dropdown-item">
                  <button
                    onClick={() => mangeIcon('dummy')} // Temporary icon value
                    className="dropdown-item"
                  >
                    Login
                  </button>
                </Link>
                <i
                  style={{
                    color: "green",
                    margin: "10px",
                  }}
                  className="bx bx-log-in"
                ></i>
              </div>
              <div className="d-flex">
                <button className="dropdown-item">Need Help?</button>
                <i
                  style={{
                    color: "blue",
                    margin: "10px",
                  }}
                  className="bx bx-headphone"
                ></i>
              </div>
            </>
          ) : (
            <div className="dropdown-container d-flex">
              <button
                onClick={() => {
                  mangeIcon(null); // Clear the icon on logout
                }}
                className="dropdown-item"
              >
                Logout
              </button>
              <i
                style={{
                  color: "red",
                  margin: "10px",
                }}
                className="bx bx-log-out"
              ></i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
