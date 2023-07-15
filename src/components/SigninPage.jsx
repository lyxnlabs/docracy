import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import OTPForm from "./OTPForm";
import LoginIcon from "@mui/icons-material/Login";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import kisarLogo from "../assets/img/logo192.png";
const SignInPage = () => {
  const [openOTPForm, setOpenOTPForm] = useState(false);
  useEffect(() => {
    setOpenBackdrop(true);
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on subsequent logins
      fetch("https://kisargo.ml/api/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
          window.location.href="/home";
          } else {
            console.log("Token is invalid");
            // Token is invalid or expired
            localStorage.removeItem("token");
            setOpenBackdrop(false);
          }
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    }
    else {
      setOpenBackdrop(false);
    }
  }, []);

  const [formData, setFormData] = useState({
    identifier: "",
  });
  const { login, isLoggedIn, logout } = useContext(UserContext);

  const [identifierError, setIdentifierError] = useState(false);

  const [identifierType, setIdentifierType] = useState("");

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [openWrongAlert, setWrongAlert] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };

  const handleChange = (e) => {
    setFormData({ identifier: e.target.value });
    if (!isValidIdentifier(e.target.value)) {
      setIdentifierError(true);
    } else {
      setIdentifierError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidIdentifier(formData.identifier)) {
      setIdentifierError(true);
      return;
    }
    setIdentifierError(false);
    setOpenBackdrop(true);
    // Send login request to the server
    const response = await fetch("https://kisargo.ml/api/checkIfUserExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: formData.identifier,
      }),
    });
    console.log(response);
    var { token, identifier_type } = await response.json();
    console.log(token);
    console.log(typeof token);
    localStorage.setItem("token", token);
    if (response.ok) {
      setIdentifierType(identifier_type);
      let URL =
        identifier_type === "email"
          ? "https://kisargo.ml/api/sendEmailOTP"
          : "https://kisargo.ml/api/sendPhoneOTP";
      const response_otp = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response_otp.ok) {
        setOpenOTPForm(true);
        setOpenBackdrop(false);
        setWrongAlert(false);
      }
    } else if (response.status === 401 || response.status === 500) {
      setOpenOTPForm(false);
      setWrongAlert(true);
      setOpenBackdrop(false);
    }
  };

  const isValidIdentifier = (identifier) => {
    // Simple email and phone number validation regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    return emailRegex.test(identifier) || phoneRegex.test(identifier);
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
        Sign In <LoginIcon sx={{ fontSize: "30px" }} />
      </Typography>
      <Typography gutterBottom fontWeight="bold">
        
      </Typography>

      <Typography variant="h5" gutterBottom>
        Docracy
      </Typography>
      <Typography variant="h5" gutterBottom>
        <img src={kisarLogo} width = {65} height = {65}/>
      </Typography>
      <Typography variant="h5" gutterBottom>
        E-Voting App for KISAR
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
        {openWrongAlert && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Sorry, You are not registered!
          </Alert>
        )}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            "@media (max-width: 600px)": { fontSize: "1.2rem" },
          }}
        >
          Email Address or Phone Number
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
          label="Email address or phone number"
          variant="outlined"
          margin="normal"
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          error={identifierError}
          helperText={
            identifierError &&
            "Please enter a valid email address or phone number"
          }
          InputLabelProps={{ style: { color: "black" } }}
        />

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
                {/* Please note section */}
                <Typography variant="subtitle1" sx={{ mt: 3, textAlign: "left" }}>
          Please note:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: "left" }}>
          <ul>
            <li>
              You must be a <b>KISAR</b> member to log in to this app.
            </li>
            <li>
              Use your registered phone number or email; any other credentials will not work.
            </li>
            <li>
              If you think you are registered and unable to log in, please contact <b>KISAR</b>.
            </li>
            <li>
              Phone numbers must be entered in 10 digits, do not enter country code(+91)
            </li>
          </ul>
        </Typography>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <OTPForm
        open={openOTPForm}
        setOpenOTPForm={setOpenOTPForm}
        identifierType={identifierType}
        identifier={formData.identifier}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default SignInPage;
