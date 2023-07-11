import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

const SignInPage = () => {
  useEffect(() => {
    // Retrieve the token from local storage or state
    const token = localStorage.getItem('token');

    if (token) {
      // Verify the token on subsequent logins
      fetch('https://kisargo.ml/api/verify-token', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            window.location.href="/home";
          }
          else {
            console.log("Token is invalid");
            // Token is invalid or expired
            localStorage.removeItem('token');
            
          } 
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
        });
    }
    
  }, []);
  
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggedIn, logout } = useContext(UserContext);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [openWrongAlert, setWrongAlert] = useState(false);

  const [openOTPForm, setOpenOTPForm] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email" && !isValidEmail(e.target.value)) {
      setEmailError(true);
      return;
    }
    if (e.target.name === "password" && !isValidPassword(e.target.value)) {
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setEmailError(true);
    }
    if (!isValidPassword(formData.password)) {
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);
    setOpenBackdrop(true);
    // Send login request to the server
    const response = await fetch("https://kisargo.ml/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });
    console.log(response);
    const { token } = await response.json();
    console.log(token);
    localStorage.setItem("token", token);
    if (response.ok) {
      window.location.href = "/home";
      setOpenBackdrop(false);
      setWrongAlert(false);
    } 
    if(response.status === 401 || response.status === 500) {
      setWrongAlert(true);
      setOpenBackdrop(false);
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^\d{3}-\d{4}$/;
    return passwordRegex.test(password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        paddingTop: 0,
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mt: 6 }}>
        Sign In
      </Typography>
      <Typography variant="h5" gutterBottom>
        into Docracy
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          padding: "0 20px", // Add some horizontal padding for smaller screens
        }}
        onSubmit={handleSubmit} // Call the handleSubmit function when the form is submitted
        InputLabelProps={{ style: { color: "black" } }}
      >
        {openWrongAlert && 
          <Alert severity="error" sx={{mb:2}}>
            Email and password combination is wrong
          </Alert>
        }
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            "@media (max-width: 600px)": { fontSize: "1.2rem" },
          }}
        >
          Email Address
        </Typography>
        <TextField
          sx={{
            height: 50,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
          label="Email address"
          variant="outlined"
          margin="normal"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailError && "Please enter a valid email address"}
          InputLabelProps={{ style: { color: "black" } }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mt: 2, "@media (max-width: 600px)": { fontSize: "1.2rem" } }}
        >
          Password
        </Typography>
        <TextField
          sx={{
            height: 50,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
          }}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name="password" // Add name attribute to link to the corresponding property in formData
          value={formData.password}
          error={passwordError}
          helperText={passwordError && "Invalid password format"}
          onChange={handleChange} // Call the handleChange function when the input changes
          InputLabelProps={{ style: { color: "black" } }}
        />
        <Typography sx={{ mt: 3, color: "gray" }}>
          Your password is your date of birth in (DD-MM-YYYY) format
        </Typography>
        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            mt: 3,
            backgroundColor: "black",
            height: 50,
            "&:hover": {
              backgroundColor: "#323030",
            },
            "&:active": {
              backgroundColor: "black",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SignInPage;
