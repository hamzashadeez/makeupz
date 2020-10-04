import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./style.css";
import firebase from "firebase";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { db, auth, storage } from "../../firebase";
import { IconButton } from "@material-ui/core";
import PostFeedModal from "../Modals/PostFeedModal";
import { Button, TextField } from "@material-ui/core";
import Modal from "react-modal";

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

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [open, handleClose] = useState(false);
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});
  // grabing the user Data
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
        getData(authUser);
      } else {
      }
    });
  });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // console.log('user')
        setUsername(user.displayName);
      } else {
        // No user is signed in.
        // alert()
      }
    });
  }, []);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  const handleSubmit = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress...
        const pr = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(pr);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image
            db.collection("feeds")
              .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                text: text,
                url: url,
                dp: user.dp,
                username: username,
              })
              .then(() => {
                db.collection("users")
                  .doc(user.username)
                  .update({
                    posts: firebase.firestore.FieldValue.increment(1),
                  });
              });
            setIsOpen(false);
            setProgress(0);
            setText("");
            setImage(null);
          });
      }
    );
  };
  useEffect(() => {
    db.collection("feeds")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        setFeeds(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            feed: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className="feed">
      <div className="addicon">
        <IconButton onClick={openModal}>
          <AddCircleIcon color="secondary" style={{ fontSize: 50 }} />
        </IconButton>
      </div>
      {feeds.map(({ id, feed }) => {
        return (
          <FeedPost
            key={id}
            username={feed.username}
            text={feed.text}
            url={feed.url}
            likes={feed.likes}
            dp={feed.dp}
          />
        );
      })}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 id="modalheader">Add A Post</h2>
        {/* <Button id='photo'color='default' variant='contained'>Choose An Image</Button> */}
        <input
          color="secondary"
          id="photo"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <form>
          <TextField
            id="outlined-multiline-static"
            label="Write Your description here"
            multiline
            color="secondary"
            rows={2}
            id="textfield"
            fullWidth
            onChange={(e) => setText(e.target.value)}
            variant="outlined"
          />
          <progress value={progress} style={{ width: "100%" }}></progress>
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
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
            <Button color="default" variant="contained" onClick={closeModal}>
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Feed;
