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
  Popover,
} from "@mui/material";

import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
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
import WavingHandIcon from "@mui/icons-material/WavingHand";

import logouticon from "../assets/img/log-out.png";
import pollingicon from "../assets/img/polling.png";
import { FaPoll } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

import VoteDialogDispatcher from "./VoteDialogDispatcher";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentActionID, setCurrentActionID] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-dropdown" : undefined;
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

  const handleLogout = () => {
    window.location.href = "/";
  };

  const campaignData = [
    {
      title: "Chairperson",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 6",
    },
    {
      title: "Vice Chairperson",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 4",
    },
    {
      title: "Hon. Secretary",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 2",
    },
    {
      title: "Hon. Joint Secretary",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 4",
    },
    {
      title: "Hon. Treasurer",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 22",
    },
    {
      title: "Hon. Joint Treasurer",
      description: "Positions avaiable : 1",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 12",
    },
    {
      title: "EC Member Clinician",
      description: "Positions avaiable : 4",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 12",
    },
    {
      title: "EC Member Embryologist",
      description: "Positions avaiable : 2",
      background: "#8f898f",
      color: "#fff",
      candidate: "Total candidates : 12",
    },
  ];

  const boxData = [
    {
      id: 1,
      title: "Cast vote",
      description: "Click here to start casting your votes",
      icon: icon1,
      background: "#f2f2f2",
      color: "#000",
    },
    {
      id: 2,
      title: "Instructions",
      description: "Click here to view instructions",
      icon: icon2,
      background: "#f2f2f2",
      color: "#000",
    },
    {
      id: 3,
      title: "FAQ",
      description: "Click here to view FAQ",
      icon: icon3,
      background: "#f2f2f2",
      color: "#000",
    },
    {
      id: 4,
      title: "Contact US",
      description: "Click here to get instructions on call",
      icon: icon4,
      background: "#f2f2f2",
      color: "#000",
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
              textAlign="Center"
            >
              <Grid item xs={2} marginBottom={-4}>
                <IconButton
                  onClick={handleSidebarOpen}
                  sx={{ marginLeft: "10px", color: "#fff" }}
                >
                  <Menu />
                </IconButton>
              </Grid>
              <Grid item xs={10} marginBottom={-4}>
                <Typography sx={{ color: "#fff", fontSize: 25 }} variant="h4">
                  Docracy
                </Typography>
              </Grid>
            </Grid>
          )}
          {!isSmallDevice && (
            <List
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#000",
                height: "100%",
              }}
            >
              <ListItem button>
                <FaPoll style={{ color: "#fff", fontSize: "32px" }} />
                <ListItemText
                  primary="Polling"
                  style={{
                    marginRight: "30px",
                    color: "#fff",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>

              <ListItem button onClick={handleLogout}>
                <HiOutlineLogout style={{ color: "#fff", fontSize: "32px" }} />
                <ListItemText
                  primary="Logout"
                  style={{
                    marginRight: "30px",
                    color: "#fff",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                />
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
                backgroundColor: "#000",
                height: "100%",
              }}
            >
              <ListItem button>
                <FaPoll style={{ color: "#fff", fontSize: "32px" }} />
                <ListItemText
                  primary="Polling"
                  style={{
                    marginRight: "30px",
                    color: "#fff",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>

              <ListItem button onClick={handleLogout}>
                <HiOutlineLogout style={{ color: "#fff", fontSize: "32px" }} />
                <ListItemText
                  primary="Logout"
                  style={{
                    marginRight: "30px",
                    color: "#fff",
                    marginLeft: "20px",
                    fontWeight: "bold",
                  }}
                />
              </ListItem>
            </List>
          </Drawer>
        </Paper>
      </Grid>
      <Grid item xs={isSmallDevice ? 12 : 10}>
        <Paper
          className="header"
          sx={{
            boxShadow: "none",
            display: "flex",
            flexDirection: isSmallDevice ? "column" : "row",
            alignItems: isSmallDevice ? "center" : "flex-start",
            marginTop: isSmallDevice ? "10px" : "0px",
            justifyContent: "space-between",
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
                <Grid item sx={{ fontSize: "32px", margin: "10px", mt: 2 }}>
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
            <div className="search" style={{ marginTop: 10 }}>
              <InputBase
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={<Search />}
                className="search-input"
              />
            </div>
            <Button onClick={handleClick} sx={{ p: 0 }}>
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
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography sx={{ p: 2 }}>
                <span
                  style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
                >
                  <WavingHandIcon />
                </span>
                <span style={{ verticalAlign: "middle" }}>Hey, John Doe</span>
              </Typography>
              <Typography
                sx={{ p: 2, cursor: "pointer" }}
                onClick={handleLogout}
              >
                <span
                  style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
                >
                  <HiOutlineLogout style={{ fontSize: "28px" }} />
                </span>
                <span style={{ verticalAlign: "middle" }}>Logout</span>
              </Typography>
            </Popover>
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
                        color: box.color,
                        border: box.border,
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
                        style={{ marginRight: "30px", color: box.color }}
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
                    color: campaign.color,
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
