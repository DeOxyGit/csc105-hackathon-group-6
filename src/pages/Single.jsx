import React, { useEffect, useState } from "react";
import "../style/Single.css";
import Header from "../components/Header";
import { Typography } from "@mui/material";
import img from "../../public/image/BClogo.png";
import Axios from "../AxiousInstance";
import { useLocation } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
const Single = () => {
  const [post, setPost] = useState([]);
  

  const location = useLocation();
  const pathname = location.pathname; // Get the current pathname from the location object
  const id = pathname.split("/")[2];

  const [updatePost , setUpdatePost] = useState({
    title:"",
    desc:"",
    id: id,
  });

  const navigate = useNavigate();

  const [comments , setComments] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleUpdateChange = e => {
    setUpdatePost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleUpdateSubmit = async () => {
    try{
        await Axios.put("/updatePost",updatePost);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
  const handleDeleteSubmit = async () => {
    try{
        await Axios.delete(`/deletePost/${id}`);
    }
    catch(err)
    {
      console.log(err);
    }
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
    navigate("/Home");
    handleDeleteSubmit();
    handleMenuClose();
  };
  

  const fetchPost  = async () => {
    await Axios.get(`/getpost/${id}`)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComment = async() => {
    await Axios.get('/getComment')
    .then((response)=>{
      setComments(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, []);

  return (
    <>
      <Header />
      <div className="single-container">
        <div className="single-visual">
          <img className="single-img" src={post.img ? (post.img) : (img)} alt="" />
          <div className="single_v-details">
            <Typography variant="h4" style={{ fontSize: "40px" }}>{post.title ? post.title : "Unknow Location"}</Typography>
            <Typography variant="body1" style={{ fontSize: "40px" }}>location : {post.location ? (post.location) : "Search on google map"}</Typography>
            <Typography variant="body1" style={{ marginTop: "50px",fontSize:"30px" }}>
              {post.rating ? (post.rating) : 0} rating
            </Typography>
            <Typography variant="body1" style={{ fontSize: "30px" }}>visiting: {post.visiting ? (post.visiting) : 0}</Typography>
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
                
        </div>
        {modal && <form
              id="formOne"
              action="" 
              onSubmit={handleUpdateSubmit}
              className="modal_f-container"
            >
                <input name="title" onChange={handleUpdateChange} type="text" className="inputForm" placeholder="Your Title"/>
                <textarea name="desc" onChange={handleUpdateChange} id="" cols="30" rows="10" className="textAreaForm" placeholder="Description"></textarea>
            <button type="submit">Submit</button>
            </form>}
        <div className="single-details">
          <Typography variant="body1">{post.desc}</Typography>
        </div>
       
        <div className="single-comment" style={{ borderRadius: "10px" }}>
          <div className="s_comment-add">
            <div className="add-structure">
              {/* <Typography variant="h5">Comment:</Typography> */}
              <form className="s-form">
                <div div className="input-wrapper">
                  <input type="text" placeholder="Comments" />
                   <button><SendIcon/></button>
                </div>
              </form>
              
            </div>
          </div>
          <div className="s_show-comment">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <img
                  src={img}
                  alt=""
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    borderRadius: "50%",
                    border: "1px solid grey",
                  }}
                />
                <div className="comment_card-details">
                  <Typography variant="h5">{comment.username}</Typography>
                  <Typography variant="body2">
                    {comment.text}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default Single;
