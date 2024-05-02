import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import Search from './Search';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (username, password) => {
    setTimeout(() => {
      setLoggedIn(true);
      setUser({ username });
    }, 1000);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div className="logged-in-container">
          <Home />
          <Search />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="login-container">
          <LoginForm onLogin={handleLogin} />
          {!showSignup && (
            <div className="button-container">
              <button onClick={toggleSignup} className="login-btn">
                Log In
              </button>
              <button onClick={toggleSignup} className="signup-btn">
                Sign Up
              </button>
              <button className="cancel-btn">Cancel</button>
            </div>
          )}
          {showSignup && <SignupForm />}
        </div>
      )}
    </div>
  );
}

export default App;
