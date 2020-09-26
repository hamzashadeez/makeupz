import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./style.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { db } from "../../firebase";
import { IconButton } from "@material-ui/core";
import PostFeedModal from "../Modals/PostFeedModal";
// import { Button } from "react-bootstrap";
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
  const [image, setImage] = useState('');
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  useEffect(() => {
    db.collection("feeds").onSnapshot((snapshot) => {
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
        <h2 id='modalheader'>Add A Post</h2>
        {/* <Button id='photo'color='default' variant='contained'>Choose An Image</Button> */}
        <input color='secondary' id='photo' type='file' onChange={(e)=>setImage(e.target.value)}/>
        <form>
          <TextField
            id="outlined-multiline-static"
            label="Write Your description here"
            multiline
            color='secondary'
            rows={2}
            id='textfield'
            fullWidth
            // defaultValue="Default Value"
            variant="outlined"
          />
          <div style={{display: 'flex', justifyContent: 'space-around', marginTop:'10px'}}>
          <Button color='secondary' variant='contained'>SUBMIT</Button>
          <Button color='default' variant='contained' onClick={closeModal}>CANCEL</Button>

          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Feed;
