import React, { useState } from "react";
import "../style/Posted.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem,Box } from "@mui/material";
import Axios from "../AxiousInstance";
function Posted({ title, username, desc, onClick }) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  

  const editInputStyle = {
    border:'none',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 8px',
  }

  const buttonColor = {
    backgroundColor:'#1DA1F2',
    color:'white'
  }

  

  

  

  const handleMoreIconClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleEditOptionClick = () => {
    toggleModal();
    handleMenuClose();
  };
  const handleDeleteOptionClick = () => {
    console.log("Delete option clicked");
    handleMenuClose();
  };

  const responseSivePosted = {
    width:{xs:'90vw',sm:'85vw',md:'60vw'}
  }
  return (
    <Box className="containerPosted" sx={responseSivePosted}>
      <div className="moreIconContainer">
        <header className="usernameTexted">
          <div style={{display:'flex' , justifyContent:'space-between'}}>
            <h3 >@{username}</h3>
            <MoreVertIcon className="moreIcon" onClick={handleMoreIconClick} />
          </div>
          <h2 style={{cursor:'pointer'}} onClick={onClick}>{title}</h2>
        </header>
        <p>{desc}</p>
        <div className="editBtn">
        
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditOptionClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteOptionClick}>Delete</MenuItem>
        </Menu>
        </div>
      </div>
      
      <div className="buttonContainer">
        <button className="likeButton">
          <FavoriteBorderIcon className="likeButtonIcon" />
        </button>
      </div>
    </Box>
  );
}

export default Posted;
