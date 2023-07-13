import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexWrap="wrap"
    color="text"
    px={1.5}
  >
    &copy; {new Date().getFullYear()}, made with
    <Box color="text" mb={-0.5} mx={0.25}>
      <FavoriteIcon color="inherit" fontSize="inherit" />
    </Box>
    by
    <a href={"https://www.lyxnlabs.com/"} target="_blank">
      <Typography variant="button" fontWeight="medium">
        &nbsp;{"LYXN LABS"}&nbsp;
      </Typography>
    </a>
    in Collaboration with <b style={{ marginLeft: 3 }}> KISAR,Bangalore</b>
  </Box>
  )
}
