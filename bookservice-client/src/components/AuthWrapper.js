// src/components/AuthWrapper.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const AuthWrapper = ({ children, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page if token is missing or expired
    }
  }, [navigate, setIsLoggedIn]);

  return <>{children}</>;
};

export default AuthWrapper;