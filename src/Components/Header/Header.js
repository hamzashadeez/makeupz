import React from "react";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import { IconButton } from "@material-ui/core";
import { auth } from "../../firebase";

function Header() {
  return (
    <div className="headercontainer shadow">
      <IconButton onClick={()=>auth.signOut()}>
        <Avatar>H</Avatar>
      </IconButton>
      <h2>Makeupz</h2>
      <IconButton>
        <Badge color="secondary" variant="dot">
          <MailIcon style={{ color: "#eee" }} />
        </Badge>
      </IconButton>
    </div>
  );
}

export default Header;
