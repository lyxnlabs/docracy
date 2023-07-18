import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ContactDialog(props) {
  const [dispatcherId, setDispatcherID] = useState(0);
  const handleClose = () => {
    props.setDispatcher(0);
  };
  useEffect(() => {
    if (props.dispatcher) setDispatcherID(props.dispatcher);
  }, [props.dispatcher]);
  return (
    <Dialog onClose={handleClose} open={dispatcherId === 4}>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <b>Contact Us</b>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" component="div">
            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText primary="Phone: +91 9538755459" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email: kisar.office@gmail.com" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address: No.1, Uma Admiralty, First Floor, Bannerghatta Main Rd, Bengaluru, Karnataka 560029" />
              </ListItem>
            </List>
            <Typography variant="body2" sx={{ mt: 2 }}>
              For any inquiries or assistance, please feel free to contact our
              support team through the provided phone number or email address.
              You can also visit our office at the given address during working
              hours.
            </Typography>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
