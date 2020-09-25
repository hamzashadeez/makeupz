import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Auth = () => {
  const [phone, setPhone] = useState("");
  const [password, SetPassword] = useState('')
  return (
    <div>
      <div className="sec login">
        {/* <img src={require("../../images/lipstick.jpg")} /> */}
        <h1>Makeupz</h1>
        <h5>The Best Place To Grow Your Beauty</h5>
        <div className="cont1">
          <h4>Already Have An Account ?</h4>
          <form id="form">
            <TextField
              id="outlined-basic"
              className="inputs"
              label="Enter Phone Number (MTN)"
              variant="outlined"
              size="small"
              color="secondary"
            />
            <label style={{ height: "10px" }}></label>
            <TextField
              password={true}
              color="secondary"
              id="outlined-basic"
              className="inputs"
              label="Enter Password here"
              variant="outlined"
              size="small"
            />
            <label style={{ height: "10px" }}></label>

            <Button
              style={{ background: "orange", marginBottom: "20px" }}
              variant="contained"
              type="button"
            >
              Log In
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              marginTop: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4>New Member ?</h4>
            <Link id='link' to='./sign_up'>Register</Link>
          </div>
        </div>
      </div>
     
    </div>
  );
};
export default Auth;