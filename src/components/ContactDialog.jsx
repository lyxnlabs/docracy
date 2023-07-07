import { Dialog, DialogContent, DialogActions, Button, Typography, DialogTitle } from "@mui/material";
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
         <div style={{backgroundColor:'#f2f2f2'}}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        <b>Contact Us</b>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <br/>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <br/>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
      </div>
    </Dialog>
  );
}
