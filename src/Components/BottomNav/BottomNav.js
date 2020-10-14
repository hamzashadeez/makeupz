import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";
import Feed from "../Feed/Feed";
import VideoScreen from "../Videos/VideoScreen";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  actionItemStyles: {
    "&$selected": {
      color: "rgb(215, 0, 0)",
    },
  },
  // This is required for the '&$selected' selector to work
  selected: {},
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // const [path] = useState(["/home/feeds", "/home/videos", "/home/saved"]);
  
  const render =()=>{
    switch (value){
        case 0:
             return <Feed />;
        case 1:
             return <VideoScreen />;
        case 2:
             return <h1>Saved</h1>;
    }
  }
  return (
    <>
      <div className="Screen">
        {render()}
      </div>
      <div className="bottomNav">
        <BottomNavigation
          value={value}
          color="secondary"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Feeds"
            // component={Link}
            // to={'/home/feeds'}
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected,
            }}
            icon={<LocalLibraryIcon />}
          />
          <BottomNavigationAction
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected,
            }}
            label="Videos"
            // component={Link}
            // to={path[1]}
            icon={<OndemandVideoIcon />}
          />
          <BottomNavigationAction
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected,
            }}
            label="Saved"
            // component={Link}
            // to={path[2]}
            icon={<BookmarksIcon />}
          />
        </BottomNavigation>
      </div>
    </>
  );
}
