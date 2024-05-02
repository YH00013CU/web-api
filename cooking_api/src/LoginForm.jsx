import React, { useState } from 'react';
import { Typography, Container, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import './Login.css'; // Import the CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Container maxWidth="xs" className="container">
      <Card className="form-container">
        <CardContent>
          <Typography variant="h4" gutterBottom className="form-title">
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <Grid container spacing={2}>
              <Grid item xs={12} className="input-field">
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12} className="input-field">
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12} className="input-field">
                <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
