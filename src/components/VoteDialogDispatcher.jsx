import React, { useEffect, useState } from "react";
import VoteDialog from "./VoteDialog";
import InstructionsDialog from "./InstructionsDialog";
import FAQDialog from "./FAQDialog";
import ContactDialog from "./ContactDialog";

export default function VoteDialogDispatcher(props) {
  const [dispatcher, setDispatcher] = useState(0);
  useEffect(() => {
    if (props.id && props.open) {
      if (props.id === 1) setDispatcher(1);
      else if (props.id === 2) setDispatcher(2);
      else if (props.id === 3) setDispatcher(3);
      else if (props.id === 4) setDispatcher(4);
      else setDispatcher(0);
    }
  }, [props.id, props.open, props.dispatchCount]);
  return (
    <div>
      {dispatcher === 1 ? (
        <VoteDialog dispatcher={dispatcher} setDispatcher={setDispatcher} />
      ) : dispatcher === 2 ? (
        <InstructionsDialog dispatcher={dispatcher} setDispatcher={setDispatcher}/>
      ) : dispatcher === 3 ? (
        <FAQDialog dispatcher={dispatcher} setDispatcher={setDispatcher}/>
      ) : dispatcher === 4 ? (
        <ContactDialog dispatcher={dispatcher} setDispatcher={setDispatcher}/>
      ) : (
        <></>
      )}
    </div>
  );
}
