import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./style.css";
import firebase from 'firebase';
import { db } from "../../firebase";
import FavoriteIcon from "@material-ui/icons/Favorite";

function FeedPost({ feedID, username, url, text, likes, dp, user }) {
  const [A, setA] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const submitComment = (e) => {
    e.preventDefault();
    db.collection('feeds').doc(feedID).collection('comment').add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user
    })
    setComment('')
    console.log(user)
  };

  useEffect(() => {
    // setA(username[0]);
    let unsubscribe;
    if (feedID) {
      unsubscribe = db
        .collection("feeds")
        .doc(feedID)
        .collection("comment")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [feedID, user]);
  return (
    <div className="feedpost">
      <div className="postheader">
        <img src={dp} id="dp" />
        <h3 className="username_text">{username}</h3>
      </div>
      <img className="post_img" src={url} />
      <div
        style={{
          padding: "10px",
        }}
      >
        <div style={{ display: "flex" }}>
          <FavoriteIcon color="secondary" />
          <h4 style={{ marginLeft: "10px" }}>{likes}</h4>
        </div>
        <h5 className="post_text">{text}</h5>
      </div>
      {/* List of comments */}
        <div className='comments'>
          {comments.map(comment=>
            <p key={comment.text}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          )}
        </div>
      <form className="Comment__form">
        <input
          type="text"
          placeholder="Post a Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" disabled={!comment} onClick={submitComment}>
          Post
        </button>
      </form>
    </div>
  );
}

export default FeedPost;
