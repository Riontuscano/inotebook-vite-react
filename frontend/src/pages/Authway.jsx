import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authcontext';

const PasswordValidation = ({ password }) => {
  const validationRules = [
    { 
      text: 'At least 8 characters', 
      check: (pw) => pw.length >= 8 
    },
    { 
      text: 'Contains uppercase letter', 
      check: (pw) => /[A-Z]/.test(pw) 
    },
    { 
      text: 'Contains lowercase letter', 
      check: (pw) => /[a-z]/.test(pw) 
    },
    { 
      text: 'Contains a number', 
      check: (pw) => /[0-9]/.test(pw) 
    }
  ];

  return (
    <div className="password-validation mb-3">
      {validationRules.map((rule, index) => (
        <div 
          key={index} 
          className="d-flex align-items-center"
        >
          {rule.check(password) ? (
            <span className="text-success me-2">✓</span>
          ) : (
            <span className="text-danger me-2">✗</span>
          )}
          <small 
            className={`${rule.check(password) ? 'text-success' : 'text-muted'}`}
          >
            {rule.text}
          </small>
        </div>
      ))}
    </div>
  );
};

const AuthForm = (props) => {
  const context = useContext(authContext);
  const { loginUser, signupUser } = context;

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    gender: ''
  });

  const handleLoginToggle = () => {
    setIsLogin(!isLogin);
  };

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const digitCheck = /[0-9]/.test(password);

    return lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const { email, password } = formData;
      const loginSuccess = await loginUser({ email, password });
      if (loginSuccess) {
        const name = localStorage.getItem('name')
        props.showAlert(`Login Successfull !! Welcome ${name}`,"success")
        navigate('/notes');
      }
    } else {
      const { email, password, userName, confirmPassword, gender } = formData;

      if (confirmPassword !== password) {
        props.showAlert("Passwords doesn't match","danger")
        return;
      }

      if (!validatePassword(password)) {
        props.showAlert("Password is not strong enough","warning")
        return;
      }

      const registerSuccess = await signupUser({ email, password, userName, gender });
      if (registerSuccess) {
        // console.log(registerSuccess);        
        props.showAlert("Account create Successfully","success")
        setIsLogin(true)
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder="User Name"
                      required
                    />
                  </div>
                )}
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {!isLogin && (
                    <PasswordValidation password={formData.password} />
                  )}
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                )}
                
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <div className="text-center">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={handleLoginToggle}
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;