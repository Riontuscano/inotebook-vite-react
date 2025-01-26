import React, { useState, useEffect, useRef, useContext } from 'react';
import '../css/LoginDropdown.css';
import AuthContext from '../context/auth/authcontext.jsx';
import { Link , useLocation ,useNavigate } from 'react-router-dom';

const ProfileDropdown = (props) => {
  const Navigate = useNavigate()
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef();
  const { icon, mangeIcon } = useContext(AuthContext);

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
          src={icon ? icon : '/user.png'} 
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
                  <button className="dropdown-item">
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
            <>
              {/* <div className="dropdown-container d-flex">
                <Link to="/profile" className="dropdown-item">
                  <button className="dropdown-item">
                    Profile
                  </button>
                </Link>
                <i
                  style={{
                    color: "blue",
                    margin: "10px",
                  }}
                  className="bx bx-user"
                ></i>
              </div> */}
              <div className="dropdown-container d-flex">
                <button
                  onClick={() => {
                    mangeIcon(null);
                    props.showAlert(`Logout Successfully Done`,"success")
                    localStorage.removeItem("icon"); 
                    localStorage.removeItem("authtoken");
                    localStorage.removeItem("name");
                    if(location.pathname === "/notes" || location.pathname === "/notes/create" || location.pathname === "/notes/archive"){
                      Navigate('/')
                    }
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
