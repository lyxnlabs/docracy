import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function InstructionsDialog(props) {
  const [dispatcherId, setDispatcherID] = useState(0);
  const handleClose = () => {
    props.setDispatcher(0);
  };
  useEffect(() => {
    if (props.dispatcher) setDispatcherID(props.dispatcher);
  }, [props.dispatcher]);
  return <Dialog open={dispatcherId === 2} onClose={handleClose} />;
}
