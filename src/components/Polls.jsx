import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  useMediaQuery,
  Typography,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import avatar from  "../assets/img/f_avatars/avatar.png";
import avatar1 from "../assets/img/f_avatars/f_avatar1.jpeg";
import avatar2 from "../assets/img/f_avatars/f_avatar2.jpeg";
import avatar3 from "../assets/img/f_avatars/f_avatar3.jpeg";
import avatar4 from "../assets/img/f_avatars/f_avatar4.jpeg";
import avatar5 from "../assets/img/f_avatars/f_avatar5.png";
import avatar6 from "../assets/img/f_avatars/f_avatar6.png";
import avatar7 from "../assets/img/f_avatars/f_avatar7.png";
import avatar8 from "../assets/img/f_avatars/f_avatar8.png";
import avatar9 from "../assets/img/f_avatars/f_avatar9.png";
import avatar10 from "../assets/img/f_avatars/f_avatar10.jpg";
import avatar11 from "../assets/img/f_avatars/f_avatar11.jpg";
import avatar12 from "../assets/img/f_avatars/f_avatar12.jpg";
import avatar13 from "../assets/img/f_avatars/f_avatar13.jpg";
import avatar14 from "../assets/img/f_avatars/f_avatar14.jpg";
import avatar15 from "../assets/img/f_avatars/f_avatar15.jpg";
import avatar16 from "../assets/img/f_avatars/f_avatar16.jpg";
import avatar17 from "../assets/img/f_avatars/f_avatar17.jpg";
import avatar18 from "../assets/img/f_avatars/f_avatar18.jpg";
import avatar19 from "../assets/img/f_avatars/f_avatar19.jpg";

import Swal from "sweetalert2";

import { TbSignRightFilled } from "react-icons/tb";
import axios from "axios";
// const posts = [
//   { id: 1, name: "Vice Chairperson", limit: 1 },
//   { id: 2, name: "Hon Secretary", limit: 2 },
//   { id: 3, name: "Hon Treasurer", limit: 1 },
//   { id: 4, name: "Hon Joint Secretary", limit: 1 },
//   { id: 6, name: "Executive Council Member - Clinician ", limit: 4 },
//   { id: 7, name: "Executive Council Member - Embryologist", limit: 2 },

// ];
const posts = [
  { id: 2, name: "Hon Secretary", limit: 1 },
  { id: 6, name: "Executive Council Member - Clinician ", limit: 4 },
  { id: 7, name: "Executive Council Member - Embryologist", limit: 2 },

];

const imagesList = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
  avatar17,
  avatar18,
  avatar19,
];
const icandidates = [
  { id: 1, name: "Candidate 1", image: avatar1, postId: 1 }, // Assign postId to candidates
  { id: 2, name: "Candidate 2", image: avatar2, postId: 1 },
  { id: 3, name: "Candidate 3", image: avatar3, postId: 2 },
  { id: 4, name: "Candidate 4", image: avatar4, postId: 2 },
  { id: 5, name: "Candidate 5", image: avatar5, postId: 2 },
  { id: 6, name: "Candidate 6", image: avatar6, postId: 3 },
  { id: 7, name: "Candidate 7", image: avatar7, postId: 3 },
  { id: 8, name: "Candidate 8", image: avatar8, postId: 2 },
  { id: 9, name: "Candidate 9", image: avatar9, postId: 2 },
  { id: 10, name: "Candidate 10", image: avatar8, postId: 3 },
  { id: 11, name: "Candidate 11", image: avatar9, postId: 3 },

  // ... add more candidates
];

const Polls = (PollsData) => {
  useEffect(() => {
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    fetch("https://lyxnlabsapi.online/api/getCandidates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const updatedCandidates = data.map((item, i) => ({
          id: item.candidate_id,
          name: item.first_name + " " + item.last_name,
          image: avatar,
          postId: item.post_id,
        }));
        setCandidates([...updatedCandidates]);
      })
      .catch((error) => {
        console.error("Failed to fetch candidates", error);
      });
  }, []);

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);
  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [casts, setCasts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const sortedCasts = [...casts].sort((a, b) => a.post_id - b.post_id);
  const [reviewClicked, setReviewClicked] = useState(false);
  const [votedInfo, setvotedInfo] = useState({});

  const [showCompleted, setShowCompleted] = useState(false);

  const submittedAlert = () => {
    Swal.fire({
      text: "Your votes were successfully submitted",
      icon: "success",
    });
  };

  const handleCloseCompleted = () => {
    setShowCompleted(false);
  };
  const handleCandidateClick = (candidate, candidate_id, post_id) => {
    const selectedCandidatesForPost = casts.filter(
      (cast) => cast.post_id === post_id
    );

    const isCandidateSelected = selectedCandidatesForPost.some(
      (cast) => cast.candidate_id === candidate_id
    );

    if (isCandidateSelected) {
      // Candidate is already selected, so remove them from the casts array
      const updatedCasts = casts.filter(
        (cast) => cast.candidate_id !== candidate_id
      );
      setCasts(updatedCasts);
    } else {
      let postLimit = 1;
      if (post_id === 1) postLimit = 1;
      else if (post_id === 2) postLimit = 1;
      else if (post_id === 3) postLimit = 1;
      else if (post_id === 4) postLimit = 1;
      else if (post_id === 6) postLimit = 4;
      else if (post_id === 7) postLimit = 2;
      else  postLimit = 1;
      
      

      if (selectedCandidatesForPost.length < postLimit) {
        setCasts((prevCasts) => [...prevCasts, { post_id, candidate_id }]);
      } else {
        // The maximum number of candidates has been reached for this post
        // Remove one candidate and replace with the new candidate

        // Find the index of the candidate to remove (assuming post_id is unique for each candidate)
        const indexToRemove = casts.findIndex(
          (cast) => cast.post_id === post_id
        );
        if (indexToRemove !== -1) {
          // Create a new casts array with the replaced candidate
          const updatedCasts = [...casts];
          updatedCasts[indexToRemove] = { post_id, candidate_id };
          setCasts(updatedCasts);
        }
      }
    }
  };
  useEffect(() => {
    // Retrieve the token from local storage or state
    const token = localStorage.getItem("token");

    if (token) {
      // Verify the token on subsequent logins
      fetch("https://lyxnlabsapi.online/api/checkIfUserVoted", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
          }
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
        });
    } else {
      window.location.href = "/";
    }
  }, [submitted]);

  const cardRef = useRef(null); // Ref for the Card component

  const handlegoBack = () => {
    setReviewClicked(false);
  };
  const getImageByCandidateID = (id) => {
    let indexOfCandidate = candidates.findIndex(function (item) {
      return item.id === id;
    });
    return candidates[indexOfCandidate].image;
  };
  const getNameByCandidateID = (id) => {
    let indexOfCandidate = candidates.findIndex(function (item) {
      return item.id === id;
    });
    return candidates[indexOfCandidate].name;
  };
  const getPostNameByPostID = (id) => {
    let indexOfPost = posts.findIndex(function (item) {
      return item.id === id;
    });
    return posts[indexOfPost].name;
  };
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
    setReviewClicked(true);
    console.log(JSON.stringify(casts));
  };

  const isLastPost = currentPostIndex === posts.length - 1;

  const handleSubmit = () => {
    setSubmitted(true);
    const token = localStorage.getItem("token");
    const axiosInstance = axios.create({
      baseURL: "https://lyxnlabsapi.online",
    });
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance
      .post("https://lyxnlabsapi.online/api/submitVotes", JSON.stringify(casts))
      .then((response) => {
        if (response.data.success) {
          setSubmitted(false);
          setShowCompleted(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else alert("Error");
      });
  };
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <>
      {!reviewClicked ? (
        <Card
          ref={cardRef}
          sx={{
            maxWidth: 500,
            margin: "0",
            marginTop: isSmallDevice ? 2 : 6,
            ml: isSmallDevice ? 3 : "auto",
            mr: isSmallDevice ? 3 : "auto",
            boxShadow: "0px 2px 4px black",
          }}
        >
          <CardHeader
            title={
              <Typography sx={{ fontWeight: "bold" }}>
                Vote for {posts[currentPostIndex].name}{" "}
              </Typography>
            }
          />
          <Typography sx={{ ml: 2, mb: 2 }}>
            Click on any image to select or unselect it
          </Typography>

          {casts.filter((item) => item.post_id === posts[currentPostIndex].id)
            .length === posts[currentPostIndex].limit ? (
            <>
             
              <LinearProgress
                sx={{
                  ml: 2,
                  mr: 2,
                  mb: 1,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#2e7d32",
                  },
                  backgroundColor: "#fff",
                }}
                variant="determinate"
                value={
                  (casts.filter(
                    (item) => item.post_id === posts[currentPostIndex].id
                  ).length /
                    posts[currentPostIndex].limit) *
                  100
                }
              />
              <Alert sx={{ ml: 2, mr: 2 }} severity="success">
                {
                  casts.filter(
                    (item) => item.post_id === posts[currentPostIndex].id
                  ).length
                }{" "}
                of {posts[currentPostIndex].limit} selected, Press Next
              </Alert>
            </>
          ) : (
            <>
              <LinearProgress
                sx={{
                  ml: 2,
                  mr: 2,
                  mb: 1,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "black",
                  },
                  backgroundColor: "#edebeb",
                }}
                variant="determinate"
                value={
                  (casts.filter(
                    (item) => item.post_id === posts[currentPostIndex].id
                  ).length /
                    posts[currentPostIndex].limit) *
                  100
                }
              />
              <Alert
                sx={{
                  ml: 2,
                  mr: 2,
                  backgroundColor: "#edebeb",
                  color: "#000",
                  "& .MuiAlert-icon": {
                    color: "#000",
                  },
                }}
                severity="info"
              >
                {
                  casts.filter(
                    (item) => item.post_id === posts[currentPostIndex].id
                  ).length
                }{" "}
                of {posts[currentPostIndex].limit} selected
              </Alert>
            </>
          )}

          <CardContent>
            <Grid container spacing={2}>
              
            
              
              {sortedCandidates.map((candidate) => (
                <Grid item xs={12} sm={6} md={4} key={candidate.id}>
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
                      backgroundColor: casts.some(
                        (cast) => cast.candidate_id === candidate.id
                      )
                        ? "#e0e0e0" // Selected candidate color
                        : "white",
                      opacity: showCard ? 1 : 0,
                      transition: "opacity 0.3s",
                      border: !(
                        casts.filter(
                          (item) => item.post_id === posts[currentPostIndex].id
                        ).length === posts[currentPostIndex].limit
                      )
                        ? casts.some(
                            (cast) => cast.candidate_id === candidate.id
                          )
                          ? "2px solid black" // Selected candidate border
                          : "1px dotted black"
                        : casts.some(
                            (cast) => cast.candidate_id === candidate.id
                          )
                        ? "2px solid green"
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
                        <span>
                          {candidate.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                        <br />
                        <span>
                          {candidate.name.split(" ").slice(2).join(" ")}
                        </span>
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
                  m: isSmallDevice ? 2 : 0,
                }}
              >
                Back
              </Button>
              {!isLastPost ? (
                <Button
                  variant="contained"
                  disabled={
                    !(
                      casts.filter(
                        (item) => item.post_id === posts[currentPostIndex].id
                      ).length === posts[currentPostIndex].limit
                    )
                  }
                  onClick={handleNext}
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                    m: isSmallDevice ? 2 : 0,
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleReviewAndSubmit}
                  disabled={
                    !(
                      casts.filter(
                        (item) => item.post_id === posts[currentPostIndex].id
                      ).length === posts[currentPostIndex].limit
                    )
                  }
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": {
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                    m: isSmallDevice ? 2 : 0,
                  }}
                >
                  proceed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "0",
            marginTop: isSmallDevice ? 2 : 6,
            marginLeft: isSmallDevice ? 3 : "auto",
            marginRight: isSmallDevice ? 20 : "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "-20px" }}
          >
            REVIEW
          </Typography>
          <TableContainer
            elevation={0}
            sx={{
              maxWidth: 700,
              margin: "0",
              marginTop: isSmallDevice ? 2 : 6,
              ml: isSmallDevice ? 1.5 : "auto",
              mr: isSmallDevice ? 3 : "auto",
            }}
            component={Paper}
          >
            <Grid container spacing={2}>
              {sortedCasts.map((cast, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      maxWidth: 300,
                      margin: "0",
                      marginTop: isSmallDevice ? 2 : 6,
                      ml: isSmallDevice ? 2 : "auto",
                      mr: isSmallDevice ? 3 : "auto",
                      boxShadow: "0px 2px 4px black",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {getPostNameByPostID(cast.post_id)}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        You selected {getNameByCandidateID(cast.candidate_id)}
                      </Typography>
                      <div
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={getImageByCandidateID(cast.candidate_id)}
                          alt={getNameByCandidateID(cast.candidate_id)}
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
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
                backgroundColor: "none",
              }}
            >
              <Button
                variant="filled"
                onClick={handlegoBack}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                }}
              >
                {"< alter choices"}
              </Button>
              <Button
                variant="filled"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </TableContainer>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={submitted}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            open={showCompleted}
            autoHideDuration={6000}
            onClose={handleCloseCompleted}
          >
            <Alert
              onClose={handleCloseCompleted}
              severity="success"
              sx={{ width: "100%" }}
            >
              Your votes were successfully submitted
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default Polls;
