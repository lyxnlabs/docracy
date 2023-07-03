import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    console.log(formData);
    // Add your logic for login here
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

 
  return (
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mt: 6 }}>
        Sign In
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sign in to your account
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          mt: 6,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '400px',
          padding: '0 20px', // Add some horizontal padding for smaller screens
        }}
        onSubmit={handleSubmit} // Call the handleSubmit function when the form is submitted
      >
        <Typography variant="h6" fontWeight="bold" sx={{ '@media (max-width: 600px)': { fontSize: '1.2rem' } }}>
          Email Address
        </Typography>
        <TextField
  sx={{
    height: 50,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        color: 'black',
      },
    },}}
  label="Email address"
  variant="outlined"
  margin="normal"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={emailError}
  helperText={emailError && 'Please enter a valid email address'}
/>

        <Typography variant="h6" fontWeight="bold" sx={{ mt:2, '@media (max-width: 600px)': { fontSize: '1.2rem' } }}>
          Password
        </Typography>
        <TextField 
          sx={{ height: 50,'& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'grey',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              color: 'black',
            },
          }, }}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name="password" // Add name attribute to link to the corresponding property in formData
          value={formData.password}
          onChange={handleChange} // Call the handleChange function when the input changes
         
        />
        <Typography sx={{ mt: 3, color: 'blue' }}>Forgot Password?</Typography>
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 3, backgroundColor: 'black', height: 50 }}
        >
          Sign In
        </Button>
      </Box>
      <Typography sx={{ mt: 4 }}>
        Don't have an account? <span style={{ color: 'blue' }}>Register Here</span>
      </Typography>
    </Box>
  );
};

export default SignInPage;
