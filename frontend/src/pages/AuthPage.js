import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import LoginForm from '../components/auth/LoginForm';

const AuthPage = ({ type }) => {
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
  };

  const renderForm = () => {
    if (type === 'login') {
      return <LoginForm onLogin={handleLogin} />;
    } else if (type === 'register') {
      return <SignupForm />;
    } else {
      return null;
    }
  };

  return <div>{renderForm()}</div>;
};

export default AuthPage;
