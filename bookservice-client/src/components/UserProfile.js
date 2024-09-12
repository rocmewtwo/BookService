// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import config from '../config';
import { getToken } from '../utils/auth';
import './UserProfile.css';


const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken(); // Retrieve the JWT token

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/user`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you use a token for authentication
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div>
          <p>Username: {userDetails.username}</p>
          <p>Role: {userDetails.role}</p>
      </div>
      <h1>Book Borrows</h1>
      <div className="inventory-container">
          {userDetails.inventories.map((inventory) => (
            <span key={inventory.id} className="inventory-item">
              <img src={inventory.book.image} alt={inventory.book.title} />
              <div>Title: {inventory.book.title}</div>
              <div>Author: {inventory.book.author}</div>
            </span>
          ))}
        </div>
    </div>
  );
};

export default UserProfile;