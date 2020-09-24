import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Form from "react-bootstrap/Form";
import "./style.css";

const Auth = () => {
  const [phone, setPhone] = useState("");
  return (
    <div>
      <div className="sec login">
        <img src={require("../../images/lipstick.jpg")} />
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
              type='button'
            >
              Log In
            </Button>
          </form>
          <div style={{ display: "flex",flexDirection: 'column',marginTop:'100px',  alignItems: "center" }}>
            <h4>New Member ?</h4>
            <h5 className='text-secondary'>Scroll Down To Register</h5>
            <ArrowDownwardIcon color='secondary' style={{fontSize: 60}}/>
          </div>
        </div>
        
      </div>
      <div id="register" className="sec">
        Terms and Policy
      </div>
    </div>
  );
};
export default Auth;
