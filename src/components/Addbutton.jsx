import React, { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import BackupIcon from "@mui/icons-material/Backup";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import "../style/Modal.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import '../style/Addbutton.css';
import Axios from "../AxiousInstance";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";

function Box({ title, content }) {
  return (
    <div className="box">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}


export default function Addbutton() {

  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate()

  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [blogData, setBlogData] = useState({ image: null });
  const [inputs, setInputs] = useState({
    title:"",
    desc:"",
    uid:"",
  });
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setBlogData({ image: file });
    }
  };

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        await Axios.post("/createPost" , inputs);
        window.location.reload();
    }
    catch(e)
    {
      console.log(e);
    }
    // const blog = {
    //   image: blogData.image,
    //   title: title,
    //   content: content,
    // };

    // fetch("http//localhost:8000/blogs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog),
    // })
    //   .then(() => {
    //     console.log("new blog added");
    //   })
    //   .catch((error) => {
    //     console.error("Error adding blog", error);
    //   });
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        <AddCircleIcon style={{ fontSize: "50px" }} />
      </button>

      {modal && (
        <div className="modal"> 
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Create Post</h2>
            <form
              id="formOne"
              action=""
              onSubmit={handleSubmit}
              className="modal_f-container"
            >
              {/* <input
                type="file"
                accept="image/*"
                className="input-field"
                hidden
                onChange={handleFileChange}
                style={{flex:1}}
              />
              {image ? (
                <img src={image} width={320} height={280} alt={fileName} />
                ) : (
                  <BackupIcon style={{ fontSize: "50px" }} />
                  )}
                */}
                <div className="imageInput"  onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept="image/*" className="input-field" onChange={handleFileChange} hidden/>
                {image ? (
                <img src={image} width={250} height={200} alt={fileName} style={{borderRadius:'10px'}} />
                ) : (
                  <BackupIcon style={{ fontSize: "50px" ,color  :'#1DA1F2'}} />
                  )}
                </div>
                <input name="title" onChange={handleChange} type="text" className="inputForm" placeholder="Your Title"/>
                <textarea name="desc" onChange={handleChange} id="" cols="30" rows="10" className="textAreaForm" placeholder="Description"></textarea>
            <button type="submit">Submit</button>
            </form>
            <button
              className="close-modal"
              onClick={toggleModal}
              style={{
                borderRadius: "50%",
                backgroundColor: "white",
                marginBottom: "20px",
              }}
            >
              <ClearIcon />
            </button>
            <div className="deleteButton">
              <button
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "fit-content",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setFileName("No selected File");
                  setImage(null);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
