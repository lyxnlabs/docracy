import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  useMediaQuery,
  Typography,
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
const posts = [
  // Example candidate data
  { id: 1, name: "Secretary 1" },
  { id: 2, name: "Treasurer 2" },
  { id: 3, name: "President 3" },
  { id: 4, name: "President 4" },
  { id: 5, name: "President 5" },
  // ... add more candidates
];

const candidates = [
  { id: 1, name: "Candidate 1", image: avatar1, postId: 1 }, // Assign postId to candidates
  { id: 2, name: "Candidate 2", image: avatar2, postId: 1 },
  { id: 3, name: "Candidate 3", image: avatar3, postId: 1 },
  { id: 4, name: "Candidate 4", image: avatar4, postId: 1 },
  { id: 5, name: "Candidate 5", image: avatar5, postId: 1 },
  { id: 6, name: "Candidate 6", image: avatar6, postId: 2 },
  { id: 7, name: "Candidate 7", image: avatar7, postId: 2 },
  { id: 8, name: "Candidate 8", image: avatar8, postId: 2 },
  { id: 9, name: "Candidate 9", image: avatar9, postId: 3 },
  { id: 10, name: "Candidate 10", image: avatar8, postId: 4 },
  { id: 11, name: "Candidate 11", image: avatar9, postId: 4 },
  { id: 12, name: "Candidate 12", image: avatar8, postId: 5 },
  { id: 13, name: "Candidate 13", image: avatar9, postId: 5 },
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
    setCasts((prevCasts) => {
      const updatedCasts = prevCasts.filter(
        (cast) => cast.post_id !== post_id
      );
      return [...updatedCasts, { post_id, candidate_id }];
    });
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
  const filteredCandidates = candidates.filter(candidate => candidate.postId === posts[currentPostIndex].id);

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
    // Construct the JSON object containing user selections
    const userSelections = {
      [posts[currentPostIndex].name]: selectedCandidate.name,
    };
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
                  Array.from(casts).some(
                    ({ post_id, candidate_id }) =>
                      post_id === posts[currentPostIndex].id &&
                      candidate_id === candidate.id
                  )
                    ? "#02ad80"
                    : "white",
                  opacity: showCard ? 1 : 0,
                  transition: "opacity 0.3s",
                  border: "1px dotted black",
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
                  </Typography>
                  {selectedCandidate?.id === candidate.id && ( // Conditionally render tick mark
                    <CloudDoneIcon
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "black",
                      }}
                    />
                  )}
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
              backgroundColor: "#02ad80",
              "&:hover": {
                backgroundColor: "#035e46",
                color: "#fff",
              },
            }}
          >
            Back
          </Button>
          {!isLastPost ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                backgroundColor: "#e86851",
                "&:hover": {
                  backgroundColor: "#873526",
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
              disabled={!selectedCandidate}
              sx={{
                backgroundColor: "#e86851",
                "&:hover": {
                  backgroundColor: "#873526",
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
