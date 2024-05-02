import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Container, TextField, Button, Card, CardContent } from '@mui/material';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/register', { username, password });
      
      setMessage('User registered successfully!');
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <Container maxWidth="xs" className="container">
      <Card className="form-container">
        <CardContent>
          <Typography variant="h4" gutterBottom className="form-title">
            Signup
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
              Signup
            </Button>
          </form>
          <Typography variant="body1" className="message">
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
