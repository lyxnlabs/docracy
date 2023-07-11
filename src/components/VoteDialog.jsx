import { AppBar, Button, Dialog, DialogContent, Divider, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Polls from "./Polls";

export default function VoteDialog(props) {
  const [dispatcherId, setDispatcherID] = useState(0);
  const handleClose = () => {
    props.setDispatcher(0);
  };
  const [childPollsData, setChildPollsData] = useState({});
  useEffect(() => {
    if (props.dispatcher) setDispatcherID(props.dispatcher);
  }, [props.dispatcher]);

  const getPollsData = (pollsData) =>{
    setChildPollsData(pollsData);
  }
  return (
    <Dialog
      fullScreen
      open={dispatcherId === 1}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{backgroundColor:"grey"}}
      
    >
      <AppBar sx={{ position: 'relative',backgroundColor:"#000" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cast your votes
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent >
        <Polls PollsData = {getPollsData}/>
        </DialogContent>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
