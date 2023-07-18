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

export default function InstructionsDialog(props) {
  const [dispatcherId, setDispatcherID] = useState(0);
  const handleClose = () => {
    props.setDispatcher(0);
  };
  useEffect(() => {
    if (props.dispatcher) setDispatcherID(props.dispatcher);
  }, [props.dispatcher]);
  return (
    <Dialog onClose={handleClose} open={dispatcherId === 2}>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <b>Instructions</b>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" component="div">
            <List sx={{ pl: 2 }}>
              <ListItem>
                <ListItemText primary="Login to the app using your credentials." />
              </ListItem>
              <ListItem>
                <ListItemText primary='Once logged in, you will see a section titled "Cast Vote" on the home page.' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Click on the box with the title "Cast Vote" to access the voting functionality.' />
              </ListItem>
              <ListItem>
                <ListItemText primary="A dialog or form will appear, prompting you to select your preferred candidates or options." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carefully review the available options and make your selections according to your preferences." />
              </ListItem>
              <ListItem>
                <ListItemText primary="If there are multiple positions or categories to vote for, navigate through the tabs or sections provided to cast votes for each category separately." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Follow any additional instructions or guidelines provided on the screen." />
              </ListItem>
              <ListItem>
                <ListItemText primary='After selecting your choices, click on the "Submit" or "Cast Vote" button to finalize your vote.' />
              </ListItem>
              <ListItem>
                <ListItemText primary="There is a confirmation or verification step, make sure to review your selections before confirming." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Once your vote is successfully cast, you will be redirected to home page and your voting is complete." />
              </ListItem>
              <ListItem>
                <ListItemText primary='If you encounter any issues or have any questions during the voting process, refer to the "Instructions" section or contact the support team for assistance.' />
              </ListItem>
            </List>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
