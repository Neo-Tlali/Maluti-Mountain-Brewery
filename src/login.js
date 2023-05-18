// backend/app.js (or equivalent)

// Import necessary libraries and modules
const express = require('express');
const { Pool } = require('pg');

const app = express();

// Create a new pool instance with your database credentials
const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'your_host',
  database: 'your_database',
  port: 'your_port',
});

// Endpoint for user authentication
app.post('/login', async (req, res) => {
  const { username, pin } = req.body;

  try {
    // Create a client from the connection pool
    const client = await pool.connect();

    // Execute the query
    const query = 'SELECT username, pin FROM users WHERE username = $1 AND pin = $2';
    const values = [username, pin];
    const result = await client.query(query, values);

    // Release the client back to the pool
    client.release();

    if (result.rows.length === 1) {
      // User found, authentication successful
      res.status(200).json({ message: 'Authentication successful' });
    } else {
      // User not found or invalid credentials
      res.status(401).json({ message: 'Invalid username or PIN' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'An error occurred during authentication' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});







// frontend/Login.js (or equivalent)

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend endpoint
      const response = await axios.post('/login', { username, pin });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;

