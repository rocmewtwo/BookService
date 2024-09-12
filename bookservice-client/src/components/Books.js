// src/components/Books.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';
import { getToken } from '../utils/auth'; // Import the getToken utility function
import './Books.css'; // Import the CSS file

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken(); // Retrieve the JWT token

    const fetchBooks = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/books`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Books you might like</h1>
      <div className="books-container">
        <ul className="books-list">
          {books.map((book) => (
            <span key={book.id} className="book-item">
                <Link to={`/books/${book.id}`}>
                  <img src={book.image} alt={book.title} className="book-image" />
                  <div>{book.title}</div>
                </Link>
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Books;