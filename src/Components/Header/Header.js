import React from "react";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

function Header() {
  return (
    <div className="headercontainer shadow">
      <Avatar>H</Avatar>
      <h2>Makeupz</h2>
      <Badge color="secondary" variant="dot">
        <MailIcon style={{color: '#eee'}} />
      </Badge>
    </div>
  );
}

export default Header;
