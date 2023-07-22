import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/OTPForm.css";
import OtpInput from "react-otp-input";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Alert, Backdrop, Snackbar, CircularProgress } from "@mui/material";
const OTPForm = (props) => {
  const [otp, setOtp] = useState();
  const [verfied, setVerfied] = useState(false);
  const [otpVal, setOtpVal] = useState([]);
  const textBase = useRef(null);
  const [email, setEmail] = useState("a@b.com");
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openOTPSuccess, setOpenOTPSuccess] = useState(false);
  const [openOTPFailed, setOpenOTPFailed] = useState(false);
  const [openOTPResentAlert, setOpenOTPResentAlert] = useState(false);

  useEffect(() => {
    let timer = null;
    if (resendEnabled) {
      timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendEnabled]);

  useEffect(() => {
    if (resendTimer === 0) {
      setResendEnabled(false);
    }
  }, [resendTimer]);

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const handleOTPComplete = async (value) => {
    setOpenBackdrop(true);
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    const response = await fetch("https://lyxnlabsapi.online/api/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        otp_code: value,
      }),
    });

    if (response.ok) {
      setOpenBackdrop(false);
      setOtp("");
      setOpenOTPFailed(false);
      setOpenOTPSuccess(true);
      setOpenOTPResentAlert(false);
      setOpenBackdrop(true);
      const response = await fetch("https://lyxnlabsapi.online/api/deleteOTP", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setTimeout(() => {
          setOpenBackdrop(false);
          window.location.href = "/home";
        }, 2000);
      }
    } else {
      setOtp("");
      setOpenOTPFailed(true);
      setOpenOTPSuccess(false);
      setOpenBackdrop(false);
    }
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const handleResendClick = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://lyxnlabsapi.online/api/deleteOTP", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setOpenBackdrop(true);
      let URL =
        props.identifier_type === "email"
          ? "https://lyxnlabsapi.online/api/sendEmailOTP"
          : "https://lyxnlabsapi.online/api/sendPhoneOTP";
      const response_otp = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response_otp.ok) {
        setOpenBackdrop(false);
        setOpenOTPResentAlert(true);
      }
    }
    else {
      alert("Error");
    }

    setResendEnabled(true);
    setResendTimer(60);
  };

  function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  return (
    <Dialog open={props.open}>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <DialogTitle id="customized-dialog-title">
          <b>ENTER THE OTP</b>
        </DialogTitle>

        <DialogContent dividers>
          {openOTPSuccess && (
            <Alert sx={{ mb: 2 }} severity="success">
              OTP verified successfully...Please wait
            </Alert>
          )}
          {openOTPResentAlert && (
            <Alert sx={{ mb: 2 }} severity="success">
              OTP resent successfully
            </Alert>
          )}
          {openOTPFailed && (
            <Alert sx={{ mb: 2 }} severity="error">
              Incorrect OTP! Please try again
            </Alert>
          )}

          <Typography gutterBottom>
            Please enter the OTP sent to your {props.identifierType}
          </Typography>
          <br />
          <Typography
            gutterBottom
            sx={{ fontWeight: "bold", fontStyle: "italic" }}
          >
            {props.identifier}
          </Typography>
          <br />

          <div>
            <MuiOtpInput
              length={4}
              value={otp}
              onChange={handleOTPChange}
              onComplete={handleOTPComplete}
              validateChar={validateChar}
              sx={{
                "& .MuiOtpInput-TextField	": {
                  borderColor: "black",
                  color: "black",
                },
              }}
            />
            {/* <Button
              variant="contained"
              sx={{
                m: 2,
                mb: 0,
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#323030",
                },
                "&:active": {
                  backgroundColor: "black",
                },
              }}
            >
              Submit
            </Button> */}
          </div>
          <br />

          <Typography gutterBottom>
            {resendEnabled ? (
              <span>Didn't receive again? Resend OTP in {resendTimer} seconds</span>
            ) : (
              <Button
                variant="text"
                color="primary"
                disabled={resendEnabled}
                onClick={handleResendClick}
              >
                Didn't receive OTP? Resend
              </Button>
            )}
          </Typography>
        </DialogContent>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default OTPForm;
