import React, { useEffect, useState } from "react";
import VoteDialog from "./VoteDialog";
import InstructionsDialog from "./InstructionsDialog";
import FAQDialog from "./FAQDialog";
import ContactDialog from "./ContactDialog";
import Swal from "sweetalert2";

export default function VoteDialogDispatcher(props) {
  const [dispatcher, setDispatcher] = useState(0);
  const [votedInfo, setVotedInfo] = useState({});

  useEffect(() => {
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on subsequent logins
      fetch("https://kisargo.ml/api/checkIfUserVoted", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setVotedInfo(data))
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (props.id && props.open) {
      if (props.id === 1) setDispatcher(1);
      else if (props.id === 2) setDispatcher(2);
      else if (props.id === 3) setDispatcher(3);
      else if (props.id === 4) setDispatcher(4);
      else setDispatcher(0);
    }
  }, [props.id, props.open, props.dispatchCount]);

  const votedAlert = () => {
    Swal.fire({
      text : "You have already casted your votes",
      icon: "success",
    });
  };

  return (
    <div>
      {dispatcher === 1 ? (
        votedInfo?.result ? (
          votedAlert()
        ) : (
          <VoteDialog dispatcher={dispatcher} setDispatcher={setDispatcher} />
        )
      ) : dispatcher === 2 ? (
        <InstructionsDialog
          dispatcher={dispatcher}
          setDispatcher={setDispatcher}
        />
      ) : dispatcher === 3 ? (
        <FAQDialog dispatcher={dispatcher} setDispatcher={setDispatcher} />
      ) : dispatcher === 4 ? (
        <ContactDialog dispatcher={dispatcher} setDispatcher={setDispatcher} />
      ) : (
        <></>
      )}
    </div>
  );
}
