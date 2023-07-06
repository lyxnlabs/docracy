import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  useMediaQuery,
  Typography,
  Alert,
} from "@mui/material";
import avatar1 from "../assets/img/avatars/avatar1.png";
import avatar2 from "../assets/img/avatars/avatar2.png";
import avatar3 from "../assets/img/avatars/avatar3.png";
import avatar4 from "../assets/img/avatars/avatar4.png";
import avatar5 from "../assets/img/avatars/avatar5.png";
import avatar6 from "../assets/img/avatars/avatar6.png";
import avatar7 from "../assets/img/avatars/avatar7.png";
import avatar8 from "../assets/img/avatars/avatar8.png";
import avatar9 from "../assets/img/avatars/avatar9.png";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { TbSignRightFilled } from "react-icons/tb";
const posts = [
  // Example candidate data
  { id: 1, name: "Secretary " },
  { id: 2, name: "Treasurer " },
  { id: 3, name: "President " },
  { id: 4, name: "Joint Secretary" },
  { id: 5, name: "Joint Secretary " },
  // ... add more candidates
];

const candidates = [
  { id: 1, name: "Candidate 1", image: avatar1, postId: 1 }, // Assign postId to candidates
  { id: 2, name: "Candidate 2", image: avatar2, postId: 1 },
  { id: 3, name: "Candidate 3", image: avatar3, postId: 2 },
  { id: 4, name: "Candidate 4", image: avatar4, postId: 2 },
  { id: 5, name: "Candidate 5", image: avatar5, postId: 2 },
  { id: 6, name: "Candidate 6", image: avatar6, postId: 3 },
  { id: 7, name: "Candidate 7", image: avatar7, postId: 3 },
  { id: 8, name: "Candidate 8", image: avatar8, postId: 4 },
  { id: 9, name: "Candidate 9", image: avatar9, postId: 4 },
  { id: 10, name: "Candidate 10", image: avatar8, postId: 5 },
  { id: 11, name: "Candidate 11", image: avatar9, postId: 5 },
  // ... add more candidates
];

const Polls = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [casts, setCasts] = useState([]);

  const handleCandidateClick = (candidate, candidate_id, post_id) => {
    setSelectedCandidate(candidate);
    let index = casts.findIndex(function (item) {
      return item.post_id === post_id;
    });
    if (index !== -1) {
      // If post_id exists, replace the old item with the new one
      casts[index] = { post_id: post_id, candidate_id: candidate_id };
    } else {
      // If post_id doesn't exist, add the new item to the casts array
      casts.push({ post_id: post_id, candidate_id: candidate_id });
    }
    console.log(casts);
  };
  const cardRef = useRef(null); // Ref for the Card component

  const handleNext = () => {
    if (currentPostIndex < posts.length - 1) {
      setShowCard(false);
      setTimeout(() => {
        setCurrentPostIndex((prevIndex) => prevIndex + 1);
        setSelectedCandidate(null);
        setShowCard(true);
        cardRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to top of card
      }, 300);
    }
  };
  const filteredCandidates = candidates.filter(
    (candidate) => candidate.postId === posts[currentPostIndex].id
  );

  const handleBack = () => {
    if (currentPostIndex > 0) {
      setShowCard(false);
      setTimeout(() => {
        setCurrentPostIndex((prevIndex) => prevIndex - 1);
        setSelectedCandidate(null);
        setShowCard(true);
      }, 300);
    }
  };

  const handleReviewAndSubmit = () => {
    console.log(JSON.stringify(casts));
  };

  const isLastPost = currentPostIndex === posts.length - 1;

  return (
    <Card
      ref={cardRef}
      sx={{
        maxWidth: 500,
        margin: "0",
        marginTop: isSmallDevice ? 2 : 6,
        border: "1px solid black",
        ml: isSmallDevice ? 3 : "auto",
        mr: isSmallDevice ? 3 : "auto",
      }}
    >
      <CardHeader title={"Vote for " + posts[currentPostIndex].name} />
      {!(casts.length >= (currentPostIndex+1)) && <Alert sx ={{ml:2, mr:2}} severity="error">Please select a candidate</Alert>}
      <CardContent>
        <Grid container spacing={2}>
          {filteredCandidates.map((candidate) => (
            
            <Grid item xs={6} sm={4} key={candidate.id}>
              <Card
                onClick={() =>
                  handleCandidateClick(
                    candidate,
                    candidate.id,
                    posts[currentPostIndex].id
                  )
                }
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    casts[currentPostIndex]?.candidate_id === candidate.id
                      ? "#e0e0e0"
                      : "white",
                  opacity: showCard ? 1 : 0,
                  transition: "opacity 0.3s",
                  border:
                  casts[currentPostIndex]?.candidate_id === candidate.id
                      ? "2px solid black"
                      : "1px dotted black",
                  width: "100%",
                }}
              >
                <CardContent>
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                  <Typography variant="body2" align="center">
                    {candidate.name}
                    {selectedCandidate?.id === candidate?.id && ( // Conditionally render tick mark
                      <TbSignRightFilled
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          color: "#fff",
                        }}
                      />
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={currentPostIndex === 0}
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            Back
          </Button>
          {!isLastPost ? (
            <Button
              variant="contained"
              disabled = {!(casts.length >= (currentPostIndex+1))}
              onClick={handleNext}
              sx={{
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleReviewAndSubmit}
              disabled={!(casts.length === 5)}
              sx={{
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
            >
              Review and Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Polls;
