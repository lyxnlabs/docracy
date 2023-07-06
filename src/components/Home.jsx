import {
  Grid,
  Paper,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ChevronLeft, ChevronRight, Search, Menu } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";
import { useEffect, useState } from "react";
import icon1 from "../assets/img/ballot.png";
import icon2 from "../assets/img/instructions.png";
import icon3 from "../assets/img/conversation.png";
import icon4 from "../assets/img/phone-call.png";
import { SiAsciidoctor } from "react-icons/si";

import logouticon from "../assets/img/log-out.png";
import pollingicon from "../assets/img/polling.png";
import VoteDialogDispatcher from "./VoteDialogDispatcher";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentActionID, setCurrentActionID] = useState(0);
  let [dispatchCount, setDispatchCount] = useState(0);
  useEffect(() => {
    console.log(dispatchCount);
  }, [dispatchCount]);
  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };



  const campaignData = [
    {
      title: "Chairperson",
      description: "Positions avaiable : 1",
      background: "#ddefe0",
      candidate: "Total candidates : 6",
    },
    {
      title: "Vice Chairperson",
      description: "Positions avaiable : 1",
      background: "#f4eddc",
      candidate: "Total candidates : 4",
    },
    {
      title: "Hon. Secretary",
      description: "Positions avaiable : 1",
      background: "#efdbdb",
      candidate: "Total candidates : 2",
    },
    {
      title: "Hon. Joint Secretary",
      description: "Positions avaiable : 1",
      background: "#ddefe0",
      candidate: "Total candidates : 4",
    },
    {
      title: "Hon. Treasurer",
      description: "Positions avaiable : 1",
      background: "#f4eddc",
      candidate: "Total candidates : 22",
    },
    {
      title: "Hon. Joint Treasurer",
      description: "Positions avaiable : 1",
      background: "#efdbdb",
      candidate: "Total candidates : 12",
    },
    {
      title: "EC Member Clinician",
      description: "Positions avaiable : 4",
      background: "#ddefe0",
      candidate: "Total candidates : 12",
    },
    {
      title: "EC Member Embryologist",
      description: "Positions avaiable : 2",
      background: "#f4eddc",
      candidate: "Total candidates : 12",
    },
  ];

  const boxData = [
    {
      id: 1,
      title: "Cast vote",
      description: "Click here to start casting your votes",
      icon: icon1,
      background: "#ddefe0",
    },
    {
      id: 2,
      title: "Instructions",
      description: "Click here to view instructions",
      icon: icon2,
      background: "#f4eddc",
    },
    {
      id: 3,
      title: "FAQ",
      description: "Click here to view FAQ",
      icon: icon3,
      background: "#efdbdb",
    },
    {
      id: 4,
      title: "Contact US",
      description: "Click here to get instructions on call",
      icon: icon4,
      background: "#dee0ef",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Perform search logic here
  };

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={0} className="home" sx={{ height: "100%" }}>
      <Grid item xs={isSmallDevice ? 12 : 2} sm={2}>
        <Paper
          elevation={2}
          className="sidebar styles"
          sx={{
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isSmallDevice && (
            <Grid
              container
              spacing={1}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={2} marginBottom={-4}>
                <IconButton
                  onClick={handleSidebarOpen}
                  sx={{ marginLeft: "10px" }}
                >
                  <Menu />
                </IconButton>
              </Grid>
              <Grid item xs={10} marginBottom={-4}>
                <Typography variant="h4">Docracy</Typography>
              </Grid>
            </Grid>
          )}
          {!isSmallDevice && (
            <List
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ListItem button>
                <img
                  src={pollingicon}
                  className="box-icon"
                  height="30vw"
                  style={{ marginRight: "30px" }}
                />
                <ListItemText primary="Polling" />
              </ListItem>
              <ListItem button>
                <img
                  src={logouticon}
                  className="box-icon"
                  height="30vw"
                  style={{ marginRight: "30px" }}
                />
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          )}
          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={handleSidebarClose}
            sx={{ backgroundColor: "#f2f2f2" }}
          >
            <List
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f2f2f2",
                height: "100%",
              }}
            >
              <ListItem button>
                <img
                  src={pollingicon}
                  className="box-icon"
                  height="30vw"
                  style={{ marginRight: "30px" }}
                />
                <ListItemText
                  primary="Polling"
                  style={{ marginRight: "30px" }}
                />
              </ListItem>
              <ListItem button>
                <img
                  src={logouticon}
                  className="box-icon"
                  height="30vw"
                  style={{ marginRight: "30px" }}
                />
                <ListItemText
                  primary="Logout"
                  style={{ marginRight: "30px" }}
                />
              </ListItem>
            </List>
          </Drawer>
        </Paper>
      </Grid>
      <Grid item xs={isSmallDevice ? 12 : 10}>
        <Paper
          elevation={0}
          className="header"
          sx={{
            display: "flex",
            flexDirection: isSmallDevice ? "column" : "row",
            alignItems: isSmallDevice ? "center" : "flex-start",
            marginTop: isSmallDevice ? "10px" : "0px",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <div style={{ marginBottom: isSmallDevice ? "30px" : 0 }}>
            {!isSmallDevice && (
              <Grid
                container
                spacing={1}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item sx={{ fontSize: "32px", margin: "10px" }}>
                  <SiAsciidoctor />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{ marginLeft: 2, fontStyle: "bold" }}
                  >
                    Docracy
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <div className="search">
              <InputBase
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={<Search />}
                className="search-input"
              />
            </div>
            <Avatar
              className="profile-icon"
              sx={{
                marginLeft: "10px",
                marginTop: "5px",
                backgroundColor: "#1a1a1a",
              }}
            >
              P
            </Avatar>
          </div>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3} className="boxes">
              {boxData.map((box, index) => (
                <Grid key={index} item xs={12} md={3}>
                  <a
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      setCurrentActionID(box.id);
                      setDispatchCount(dispatchCount++);
                    }}
                  >
                    <Paper
                      elevation={2}
                      className="box"
                      sx={{
                        backgroundColor: box.background,
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <VoteDialogDispatcher
                        open={box.id === currentActionID}
                        id={currentActionID}
                        dispatchCount={dispatchCount}
                      />
                      <img
                        src={box.icon}
                        alt="Icon 1"
                        className="box-icon"
                        height="50vw"
                        style={{ marginRight: "30px" }}
                      />
                      <div className="box-content">
                        <h3 style={{ marginBottom: "-10px" }}>{box.title}</h3>
                        <p>{box.description}</p>
                      </div>
                    </Paper>
                  </a>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={-3}
              marginLeft={5}
              marginTop={1}
            >
              <b>General Elections</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={-3}
              marginLeft={5}
              marginTop={1}
            >
              <p>This is a dummy election</p>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography
              variant="h5"
              gutterBottom
              marginBottom={-3}
              marginLeft={5}
              marginTop={1}
            >
              <b>Open posts</b>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Typography
              gutterBottom
              marginBottom={-3}
              marginLeft={5}
              marginTop={1}
            >
              <p>Click on each post to know more...</p>
            </Typography>
          </Grid>
          <Grid item xs={12} className="carousel">
            <Carousel
              selectedItem={currentSlide}
              autoScroll={true}
              onChange={handleSlideChange}
              showArrows={true}
              infiniteLoop={true}
              emulateTouch={true}
              showThumbs={false}
              centerMode={isSmallDevice ? false : true}
              centerSlidePercentage={isSmallDevice ? 100 : 33.33}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      zIndex: 1,
                      background: "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <ChevronLeft />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      zIndex: 1,
                      background: "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <ChevronRight />
                  </button>
                )
              }
            >
              {campaignData.map((campaign, index) => (
                <div
                  key={index}
                  className="campaign-box"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: campaign.background,
                    margin: "30px",
                    height: "200px",
                    padding: "10px",
                    color: "#000",
                  }}
                >
                  <h2 className="campaign-title">{campaign.title}</h2>
                  <p>{campaign.description}</p>
                  <p>{campaign.candidate}</p>
                </div>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
