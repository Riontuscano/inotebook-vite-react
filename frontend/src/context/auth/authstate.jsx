import React, { useState } from 'react';
import AuthContext from "./authcontext";

const AuthState = (props) => {
  const [icon, setIcon] = useState(null); // Store the icon URL
  const host = "http://localhost:5500";

  const mangeIcon = (newIcon) => {
    setIcon(newIcon); // Update the icon state
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

      // Check if the response indicates successful login
      if (data.success) {
        mangeIcon(data.icon); // Update the icon when login is successful
        return true;
      } else {
        alert(data.message || "Invalid credentials");
        return false;
      }
    } catch (error) {
      console.log("Some Error occurred:", error);
      alert("An error occurred. Please try again.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, mangeIcon, icon }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
