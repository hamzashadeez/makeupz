import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./style.css";
import FavoriteIcon from "@material-ui/icons/Favorite";

function FeedPost({ username, url, text, likes }) {
  const [A, setA] = useState("");
  useEffect(() => {
    setA(username[0]);
  }, []);
  return (
    <div className="feedpost">
      <div className="postheader">
        <Avatar>{A}</Avatar>
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
    </div>
  );
}

export default FeedPost;
