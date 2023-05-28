import React, { useState } from "react";
import "../style/Favourite.css";
import Header from "../components/Header";
import { Grid, Typography } from "@mui/material";
import img from "../../public/image/BClogo.png";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const likeItem = [
  {
    id: 1,
    src: img,
    title: "Balee island",
    location: "Search on google map",
    rating: 5,
    visiting: 156,
  },
  {
    id: 2,
    src: img,
    title: "Papee island",
    location: "Search on google map",
    rating: 4,
    visiting: 326,
  },
  {
    id: 3,
    src: img,
    title: "Dawg island",
    location: "Search on google map",
    rating: 4.5,
    visiting: 321,
  },
  {
    id: 4,
    src: img,
    title: "Lalee island",
    location: "Search on google map",
    rating: 3.8,
    visiting: 3286,
  },
];

const Favourite = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMoreIconClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleEditOptionClick = () => {
    console.log("Edit option clicked");
    handleMenuClose();
  };
  const handleDeleteOptionClick = () => {
    console.log("Delete option clicked");
    handleMenuClose();
  };

  const navigate = useNavigate();

  return (
  
      <div className="MainOfFav">
        <Header />
        <Grid
          container
          rowSpacing={"20px"}
          columnSpacing={"20px"}
          style={{ padding: "20px" }}
        >
          {likeItem.map((item) => (
            <Grid item md={6} key={item.id} className="GridMain" >
              <div className="fav-card" onClick={() => navigate("/Single")}>
                <img className="fav-img" src={item.src} alt="" />
                <div className="fav-details">
                  <Typography variant="h5" style={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1">
                    location: {item.location}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    {item.rating} rating
                  </Typography>
                  <Typography variant="body2">
                    visiting: {item.visiting}
                  </Typography>
                </div>
                
              </div>
              <div className="edit-button" style={{width:'fit-content', borderRadius:'50%',height:'50px'}}>
                  <MoreVertIcon
                    className="moreIcon"
                    onClick={handleMoreIconClick}
                    sx={{ fontSize: "50px"}}
                  />
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditOptionClick}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteOptionClick}>
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
            </Grid>
          ))}
        </Grid>

        <div className="buttonDiv">
          <button className="fav-bottom" style={{ borderRadius: "20px" }}>
            <h3>Add</h3>
          </button>
        </div>
      </div>

  );
};

export default Favourite;
