// src/components/BookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';
import { getToken } from '../utils/auth';
import './BookDetail.css'; // Import the CSS file

const BookDetail = ({ username }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken(); // Retrieve the JWT token

    const fetchBook = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/books/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the JWT token
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  const handleReturn = async (inventoryId) => {
    const token = getToken(); // Retrieve the JWT token

    try {
      const response = await fetch(`${config.BASE_URL}/books/return/`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the JWT token
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ "inventoryId": inventoryId }),
        method: 'PUT',
      });

      if (response.status == 404) {
        alert("Book not found");
        throw new Error('Book not found');
      }

      if (response.status == 409) {
        alert("Book cannot be returned by another user");
        throw new Error('Book cannot be returned by another user');
      }

      // Refresh the inventories data
      const updatedInventories = book.inventories.map((inventory) =>
        inventory.id === inventoryId ? { ...inventory, user: null, loanDate: null } : inventory
      );
      setBook({ ...book, inventories: updatedInventories });
    } catch (error) {
      console.error('There was a problem with the return request:', error);
    }
  };

  const handleLoan = async (inventoryId) => {
    const token = getToken(); // Retrieve the JWT token

    try {
      const response = await fetch(`${config.BASE_URL}/books/borrow/`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the JWT token
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ "inventoryId": inventoryId }),
        method: 'PUT',
      });

      if (response.status == 404) {
        alert("Book not found");
        throw new Error('Book not found');
      }

      if (response.status == 409) {
        alert("Book is already borrowed");
        throw new Error('Book is already borrowed');
      }

      // Refresh the inventories data
      const updatedInventories = book.inventories.map((inventory) =>
        inventory.id === inventoryId ? { ...inventory, user: username, loanDate: new Date().getFullYear() + '/' + (new Date().getMonth() + 1) } : inventory
      );
      setBook({ ...book, inventories: updatedInventories });
    } catch (error) {
      console.error('There was a problem with the loan request:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='container'>
      <div className='book-info'>
        <img src={book.image} alt={book.title} />
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>
      <div className='book-inventory'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {book.inventories
              .map((inventory) => (
              <tr key={inventory.id}>
                <td>{inventory.id}</td>
                <td>{inventory.user}</td>
                <td>{inventory.loanDate ? new Date(inventory.loanDate).getFullYear() + '/' + (new Date(inventory.loanDate).getMonth() + 1) : "" }</td>
                <td>
                  {!inventory.user ? (
                    <button onClick={() => handleLoan(inventory.id)}>Loan</button>
                  ) : (
                    inventory.user == username ? <button onClick={() => handleReturn(inventory.id)}>Return</button> : ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookDetail;