import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { useHistory} from 'react-router-dom'
import ForumIcon from "@material-ui/icons/Forum";
import "./style.css";
function Profile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(user);
  }, [user]);

  const history = useHistory();

  const getData = async (us) => {
    const res = await db
      .collection("users")
      .where("email", "==", us.email)
      .get()
      .then((q) => {
        q.forEach((dd) => {
          setUser(dd.data());
        });
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        // console.log(authUser);
        getData(authUser);
        // setUser(authUser);
      } else {
        //
      }
    });

    return () => {
      //some clean ups
      unsubscribe();
    };
  }, []);
  return (
    <div className="profilecontainer">
      <div className="pheader">
        <IconButton onClick={()=> history.push('/home')}>
          <ArrowBackIcon style={{color: '#fff'}}/>
        </IconButton>
        <h3>Profile</h3>
      </div>

      <img
        src={require("../../images/bg.jpg")}
        className="bbbb"
        alt="lipstrick"
      />
      <div className="profilepiccontainer">
        <img src={require("../../images/lady.png")} alt="h" className="img" />
      </div>
      <div className="banner">
        <div>
          <div className="pblock1">
            <h4>{user.username}</h4>
          </div>
        </div>

        <div className="pblock2">
          <div className="stats">
            <h2>{user.followers}</h2>
            <h6>Followers</h6>
          </div>

          <hr></hr>

          <div className="stats">
            <h2>{user.following}</h2>
            <h6>Following</h6>
          </div>
        </div>
        <div className="details">
          <div className="listOF">
            <ForumIcon
              style={{ color: "#666", marginRight: "10px" }}
            ></ForumIcon>
            <h4>Posts : {user.posts}</h4>
          </div>
          <div className="listOF">
            <ForumIcon
              style={{ color: "#666", marginRight: "10px" }}
            ></ForumIcon>
            <h4>Videos : {user.videos}</h4>
          </div>
          <div className="listOF">
            <ForumIcon
              style={{ color: "#666", marginRight: "10px" }}
            ></ForumIcon>
            <h4>Go Credit : {user.credit}</h4>
          </div>
          <div className='bbuttons'>
          {/* <Button>Buy Go Credit</Button> */}
          <Button style={{marginTop: '10px'}} variant='contained' color= 'light'>Change Profile Picture</Button>
          <Button style={{marginTop: '10px'}} variant='contained' color= 'secondary'
          onClick={()=>{
              auth.signOut();
              history.push('/')
          }}
          >Log Out</Button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
