import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../../firebase";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ForumIcon from "@material-ui/icons/Forum";
import "./style.css";
import Modal from "react-modal";
function Profile() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "70%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.setAppElement(document.getElementById("root"));
  const [image, setImage] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [progress,setProgress] = useState(0)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(user);
  }, [user]);

  const changeDP = (e)=>{
      e.preventDefault();
      //
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed", (snapshot) => {
      //progress...
      const pr = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(pr);
    },
    (error)=>{
      alert(error.message)
    },
    ()=>{
      storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then((url)=>{
          // post image
          db.collection('users').doc(user.username).update({
            dp: url
          });
          setIsOpen(false);
          setProgress(0);
          
          setImage(null);
        })
    }
    );
  }
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
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  return (
    <div className="profilecontainer">
      <div className="pheader">
        <IconButton onClick={() => history.push("/home")}>
          <ArrowBackIcon style={{ color: "#fff" }} />
        </IconButton>
        <h3>Profile</h3>
      </div>

      <img
        src={require("../../images/bg.jpg")}
        className="bbbb"
        alt="lipstrick"
      />
      <div className="profilepiccontainer">
        <img src={user.dp} alt="h" className="img" />
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
          <div className="bbuttons">
            {/* <Button>Buy Go Credit</Button> */}
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="light"
              onClick={openModal}
            >
              Change Profile Picture
            </Button>
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                auth.signOut();
                history.push("/");
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 id="modalheader">Change Profile Picture</h2>
          {/* <Button id='photo'color='default' variant='contained'>Choose An Image</Button> */}
          <form onSubmit={changeDP}>

         
          <input
            color="secondary"
            id="photo"
            type="file"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
          <progress value={progress} style={{width: '100%'}}></progress>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              type='submit'
            >
              SUBMIT
            </Button>
            <Button color="default" type='button' variant="contained" onClick={closeModal}>
              CANCEL
            </Button>
          </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
