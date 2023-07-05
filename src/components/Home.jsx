import { Grid, Paper, Typography, IconButton, InputBase, Avatar, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ChevronLeft, ChevronRight, Search, Menu } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';
import { useState } from 'react';
import icon1 from "../assets/img/trend.png";
import logouticon from "../assets/img/log-out.png";
import pollingicon from "../assets/img/polling.png";
const Icon1 = () => <img src={icon1} alt="Icon 1" />;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    { title: 'Campaign 1', description: 'Description 1' },
    { title: 'Campaign 2', description: 'Description 2' },
    { title: 'Campaign 3', description: 'Description 3' },
    { title: 'Campaign 4', description: 'Description 4' },
  ];

  const boxData = [
    { title: 'Box 1', description: 'Description 1', icon: icon1 },
    { title: 'Box 2', description: 'Description 2', icon: icon1 },
    { title: 'Box 3', description: 'Description 3', icon: icon1 },
    { title: 'Box 4', description: 'Description 4', icon: icon1 },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Perform search logic here
  };

  const isSmallDevice = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={0} className="home" sx={{  height: '100%' }}>
      <Grid item xs={isSmallDevice ? 12 : 2} sm={2}>
        <Paper elevation={2} className="sidebar styles" sx={{ boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', borderRadius: '5px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          {isSmallDevice && (
            <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
              <Grid item xs={2} marginBottom={-4}>
                <IconButton onClick={handleSidebarOpen} sx={{ marginLeft: '10px' }}>
                  <Menu />
                </IconButton>
              </Grid>
              <Grid item xs={10} marginBottom={-4}>
                <Typography variant="h4">Docracy</Typography>
              </Grid>
            </Grid>
          )}
          {!isSmallDevice && (
            <List sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <ListItem button>
              <img src={pollingicon} className="box-icon" height="30vw" style={{marginRight:"30px"}}/>
                <ListItemText primary="Polling" />
              </ListItem>
              <ListItem button>
              <img src={logouticon} className="box-icon" height="30vw" style={{marginRight:"30px"}}/>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          )}
          <Drawer anchor="left" open={sidebarOpen} onClose={handleSidebarClose} sx={{backgroundColor:'#f2f2f2'}}>
            <List sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column',backgroundColor:'#f2f2f2', height:'100%' }}>
              <ListItem button>
              <img src={pollingicon} className="box-icon" height="30vw" style={{marginRight:"30px"}}/>
                <ListItemText primary="Polling" style={{marginRight:"30px"}}/>
              </ListItem>
              <ListItem button>
              <img src={logouticon} className="box-icon" height="30vw" style={{marginRight:"30px"}}/>
                <ListItemText primary="Logout" style={{marginRight:"30px"}}/>
              </ListItem>
            </List>
          </Drawer>
        </Paper>
      </Grid>
      <Grid item xs={isSmallDevice ? 12 : 10}>
        <Paper
          elevation={2}
          className="header"
          sx={{
            display: 'flex',
            flexDirection: isSmallDevice ? 'column' : 'row',
            alignItems: isSmallDevice ? 'center' : 'flex-start',
            marginTop: isSmallDevice ? '10px' : '0px',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            padding: '10px',
            margin: '10px',
          }}
        >
          <div style={{ marginBottom: isSmallDevice ? '30px' : 0 }}>
            {!isSmallDevice && (
              <Grid container spacing={1} justifyContent="flex-start" alignItems="center">
               
                <Grid item>
                  <Typography variant="h4" sx={{marginLeft:2, fontStyle:'bold'}}>Docracy</Typography>
                </Grid>
              </Grid>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <div className="search">
              <InputBase
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                startAdornment={<Search />}
                className="search-input"
              />
            </div>
            <Avatar className="profile-icon" sx={{ marginLeft: '10px', marginTop: '5px', backgroundColor: '#1a1a1a' }}>
              P
            </Avatar>
          </div>
        </Paper>
       
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Grid container spacing={3} className="boxes">
  {boxData.map((box, index) => (
    <Grid key={index} item xs={12} md={3}>
      <Paper
        elevation={2}
        className="box"
        sx={{
         
          borderRadius: '5px',
          padding: '10px',
          backgroundColor: '#f2f2f2',
         
        }}
      >
      
      <img src={box.icon} alt="Icon 1" className="box-icon" height="50vw" style={{marginRight:"30px"}}/>
                <div className="box-content">
                  <h3 style={{marginBottom:"-10px"}}>{box.title}</h3>
                  <p>{box.description}</p>
                </div>
      </Paper>
    </Grid>
  ))}
</Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom marginBottom={-3} marginLeft={5} marginTop={1}>
                <b>Open Campaigns</b>
              </Typography>
            </Grid>
            <Grid item xs={12} className="carousel" >
              <Carousel
                selectedItem={currentSlide}
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
                    style={{ position: 'absolute', left: 0, top: '50%', zIndex: 1, background: 'none', border: 'none', outline: 'none' }}
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
                    style={{ position: 'absolute', right: 0, top: '50%', zIndex: 1, background: 'none', border: 'none', outline: 'none' }}
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
                     
                      borderRadius: '10px',
                      backgroundColor: '#f2f2f2',
                      margin: '30px',
                      height: '340px',
                      padding:'10px'
                    }}
                  >
                    <h2 className="campaign-title">{campaign.title}</h2>
                    <p>{campaign.description}</p>
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
