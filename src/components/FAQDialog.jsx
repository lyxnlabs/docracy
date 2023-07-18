import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQDialog(props) {
  const [dispatcherId, setDispatcherID] = useState(0);
  const handleClose = () => {
    props.setDispatcher(0);
  };
  useEffect(() => {
    if (props.dispatcher) setDispatcherID(props.dispatcher);
  }, [props.dispatcher]);

  return (
    <Dialog onClose={handleClose} open={dispatcherId === 3}>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <b>Frequently Asked Questions</b>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" component="div">
            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">1. How can I vote?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  If you are seeing this page, you are already logged in and you
                  have the rights to vote. Just press "Cast Vote" on home page
                  and start voting
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  2. Can I change my vote after casting it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  No, once you have cast your vote, it is typically final and
                  cannot be changed. Make sure to carefully review your choices
                  before submitting your vote to ensure accuracy.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  3. How do I reset my password?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  There is no password required to login into this App.If you
                  are a KISAR member and you are using a registered email or
                  phone then you can just login with OTP
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  4. How can I contact the support team for assistance?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  To contact the support team, you can visit the "Contact Us"
                  section of the app. There, you will find instructions on how
                  to reach out to the support team via email, phone, or any
                  other available contact methods.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  5. Can I view my voting history?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Depending on the app's features, you may be able to view your
                  voting history. Check the app's "Profile" or "Account" section
                  to see if there is an option to access your voting history or
                  any related information.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
