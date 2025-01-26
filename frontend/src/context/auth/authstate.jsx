import React, { useState, useEffect } from 'react';
import AuthContext from "./authcontext";

const AuthState = (props) => {
  const [icon, setIcon] = useState(() => {
    // Initialize icon state from localStorage if available
    const savedIcon = localStorage.getItem("icon");
    return savedIcon ? savedIcon : null;
  });

  const host = "http://localhost:5500";

  const mangeIcon = (newIcon) => {
    setIcon(newIcon);
    localStorage.setItem("icon", newIcon); // Persist icon to localStorage
  };

  const loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${host}/api/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        mangeIcon(data.icon);
        localStorage.setItem("authtoken", data.authtoken);
        localStorage.setItem("name", data.uname); 
        return true;
      } else {
        alert(data.error || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.log("Some Error occurred in login:", error);
      alert("An error occurred. Please try again.");
      return false;
    }
  };

  const signupUser = async ({ email, password, userName, gender }) => {
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName, gender }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        return true;
      } else {
        alert(data.errors || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.log("Some Error occurred in signup:", error);
    }
  };

  useEffect(() => {
    // Rehydrate icon state on component mount
    const savedIcon = localStorage.getItem("icon");
    if (savedIcon) {
      setIcon(savedIcon);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginUser, signupUser, mangeIcon, icon }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
