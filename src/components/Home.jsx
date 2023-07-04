import React, { useState } from 'react';
import { Grid, Paper, Hidden, Typography, IconButton, InputBase, Avatar } from '@material-ui/core';
import { ChevronLeft, ChevronRight, Search } from '@material-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };
  

  const campaignData = [
    { title: 'Campaign 1', description: 'Description 1' },
    { title: 'Campaign 2', description: 'Description 2' },
    { title: 'Campaign 3', description: 'Description 3' },
    { title: 'Campaign 4', description: 'Description 4' },
  ];

  const boxData = [
    { title: 'Box 1', description: 'Description 1' },
    { title: 'Box 2', description: 'Description 2' },
    { title: 'Box 3', description: 'Description 3' },
    { title: 'Box 4', description: 'Description 4' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Perform search logic here
  };

  return (
    <Grid container spacing={10} className="home">
      <Hidden xsDown>
        <Grid item sm={2}>
          <Paper elevation={2} className="sidebar styles" style={{ boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}>
            <h2>Sidebar</h2>
          </Paper>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={10}>
      <Paper
  elevation={2}
  className="header"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '30px',
    margin: '10px',
    width: '100%',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
  }}
>
  <h1 className="title">Docracy</h1>
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
    <Avatar className="profile-icon" style={{ marginLeft: '10px' }}>
      P
    </Avatar>
  </div>

  <style jsx>{`
    @media (max-width: 600px) {
      .header {
        flex-direction: column;
        align-items: center;
      }
      .title {
        margin-bottom: 10px;
      }
      .search {
        margin-bottom: 10px;
      }
    }
  `}</style>
</Paper>


        <Paper
          elevation={2}
          className="content"
          style={{
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '5px',
            overflowX: 'auto',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3} className="boxes">
                {boxData.map((box, index) => (
                  <Grid key={index} item xs={12} md={3}>
                    <Paper
                      elevation={2}
                      className="box"
                      style={{
                        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
                        borderRadius: '5px',
                      }}
                    >
                      {box.title}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Open Campaigns
              </Typography>
            </Grid>
            <Grid item xs={12} className="carousel">
              <Carousel
                selectedItem={currentSlide}
                onChange={handleSlideChange}
                showArrows={true}
                infiniteLoop={true}
                emulateTouch={true}
                showThumbs={false}
                centerMode={window.innerWidth <= 600 ? false : true}
                centerSlidePercentage={window.innerWidth <= 600 ? 100 : 33.33}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <button
                      type="button"
                      onClick={onClickHandler}
                      title={label}
                      style={{ position: 'absolute', left: 0, top: '50%', zIndex: 1 }}
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
                      style={{ position: 'absolute', right: 0, top: '50%', zIndex: 1 }}
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
                      boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
                      borderRadius: '5px',
                      margin: '10px',
                      height: '200px',
                    }}
                  >
                    <h2 className='campaign-title'>{campaign.title}</h2>
                    <p>{campaign.description}</p>
                  </div>
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
