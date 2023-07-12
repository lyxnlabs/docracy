import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import VoteDialogDispatcher from "./VoteDialogDispatcher";

export default function ElectionInfo() {
  const [electionData, setElectionData] = useState({});
  const [votedInfo, setvotedInfo] = useState({});
  let [dispatchCount, setDispatchCount] = useState(0);
  const [userData, setData] = useState([]);

  useEffect(() => {
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
          if (!response.ok) {
            // Token is invalid or expired
            localStorage.removeItem("token");
            window.location.href = "/";
          } else {
            console.log("Token is valid");
            // Fetch protected data
            fetch("https://kisargo.ml/api/user-data", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setData(data);
              })
              .catch((error) => {
                console.error("Failed to fetch protected data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, []);

  const [voteNow, setVoteNow] = useState(false);
  const handleVoteNow = ()=>{
    setDispatchCount(dispatchCount++);
    setVoteNow(true);
  }
  useEffect(() => {
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on subsequent logins
      fetch("https://kisargo.ml/api/getElectionStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setElectionData(data))
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, []);
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
        .then((data) => setvotedInfo(data))
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <Card elevation={5} sx={{ backgroundColor: "#f2f2f2", mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ margin: 2 }}>
          <span style={{ marginRight: "0.5rem", verticalAlign: "middle" }}>
            <WavingHandIcon />
          </span>
          <span style={{ verticalAlign: "middle" }}>
            Hey,{" "}
            {`${userData?.first_name
              ?.charAt(0)
              .toUpperCase()}${userData?.first_name?.slice(
              1
            )} ${userData?.last_name
              ?.charAt(0)
              .toUpperCase()}${userData?.last_name?.slice(1)}`}
          </span>
        </Typography>
        <Typography
          sx={{ fontSize: 14, mb: 1.5 }}
          color="text.secondary"
          gutterBottom
        >
          {electionData?.isLive ? (
            <Alert severity="success">Election XYZ is live</Alert>
          ) : (
            <>
              <Alert severity="error">No election is live</Alert>
              <Typography sx={{ m: 2 }} color="text.secondary">
                You cannot vote now
              </Typography>
              <Alert severity="info">Elections will start on 8th July</Alert>
            </>
          )}
        </Typography>
        {electionData?.isLive && (
          <>
            {!votedInfo?.result ? (
              <>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <Alert severity="warning">You have not voted yet</Alert>
                </Typography>
                <Typography variant="body2" sx={{ margin: 2, mb: 0 }}>
                  Click below to cast your votes
                </Typography>
              </>
            ) : (
              <>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                  <Alert severity="success">
                    You have successfully completed your voting
                  </Alert>
                </Typography>
              </>
            )}
          </>
        )}
      </CardContent>
      {electionData?.isLive && (
        <>
          {!votedInfo?.result && (
            <>
              <CardActions sx={{ margin: 2, marginTop: 0 }}>
                <Button
                  onClick={handleVoteNow}
                  variant="filled"
                  size="small"
                  sx={{
                    backgroundColor: "black",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#323030",
                    },
                    "&:active": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  vote now
                </Button>
                <VoteDialogDispatcher
                        open={voteNow}
                        id={1}
                        dispatchCount={dispatchCount}
                      />
              </CardActions>
            </>
          )}
        </>
      )}
      {votedInfo?.result && (
            <>
              {/* <CardActions sx={{ margin: 2, marginTop: 0 }}>
                <Button
                  variant="filled"
                  size="small"
                  sx={{
                    backgroundColor: "black",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#323030",
                    },
                    "&:active": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  VIEW YOUR VOTES
                </Button>
              </CardActions> */}
            </>
          )}
    </Card>
  );
}
