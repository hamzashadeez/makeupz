import React, { useEffect, useState } from "react";
import FeedPost from "../FeedPost/FeedPost";
import "./style.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { db } from "../../firebase";
import { IconButton } from "@material-ui/core";
import PostFeedModal from "../Modals/PostFeedModal";
import Button from 'react-bootstrap/Button'

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [open, handleClose] = useState(false);

  
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
        <IconButton onClick={() => handleClose(true)}>
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
      
      
    </div>
  );
}

export default Feed;
