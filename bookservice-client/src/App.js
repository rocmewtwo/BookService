import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Books from './components/Books';
import AuthWrapper from './components/AuthWrapper';
import Header from './components/Header';
import BookDetail from './components/BookDetail';
import UserProfile from './components/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem('username'));
    }
  }, [isLoggedIn, username]);

  return (
    <Router>
      <div className="App">
        {<Header username={username} />}
        <div className="main-content">
          <AuthWrapper setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}>
              <Routes>
                  <Route path="/" element={<Books />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/books/:id" element={<BookDetail username={username} />} />
                  <Route path="/profile" element={<UserProfile />} />
              </Routes>
            </AuthWrapper>
        </div>
      </div>
    </Router>
  );
}

export default App;
