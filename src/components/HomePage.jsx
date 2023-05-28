  import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import '../style/Home.css'
import AddButton from '../components/Addbutton';
import { AuthContext } from '../authContext';
import Posted from '../components/Posted';
import {useNavigate} from 'react-router-dom';
import Axios from '../AxiousInstance';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


function HomePage() {

  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const [posts , setPosts] = useState([]);

  useEffect(()=>{
    fetchData();
    console.log(posts);
  },[])

  const fetchData = () => {
    Axios.get("/getAllposts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }


  const responSive = {
    display:{xs:'none',sm:'none',md:'flex'}
  }
  const responSiveCenter = {
    display:{xs:'flex',sm:'flex',md:'none'},
    justifyContent:'center',
    flexDirection:'columns',
    height:{xs:'20vh', sm:'20vh',md:'false'},
  }
  return (
    <>
    <Header/>
    <Box className="containerHome">
        <Box className="leftSideHome" sx={responSive}>
          <div className="leftFeed">
            <p>Add post</p>
          </div>
          <div className="addButton">
          <AddButton/>
          </div>
        </Box>

        <Box className="centerHome">
        <Grid className="leftSideHome" sx={responSiveCenter}>
          <div className="wrapAddpost" style={{display:'flex',flexDirection:'columns',alignItems:'center'}}>
           <div className="leftFeed" >
            <p>Add post</p>
            </div>
           <div className="addButton">
             <AddButton/>
            </div>
          </div>
        </Grid>
          <header className='welcomeTextHome'>
           <p className= 'textHeaderHome'>
            <span className='firstText'>Welcome</span>
            <span className='secondText'><strong> username</strong></span>
           </p>
          </header>
          {posts.map((post)=>(
            <Posted key={post.id} onClick={()=>navigate(`/Single/${post.id}`)} title={post.title} 
              username={post.username ? post.username : "Unknow"} desc={post.desc}/>
          ))}
          <Posted/>
          
        </Box>
        <Grid className="rightSideHome" sx={responSive} >
        </Grid>
      </Box>
    </>

  )
}

export default HomePage;