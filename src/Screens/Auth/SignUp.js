import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./style.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="sec login2">
        {/* <img src={require("../../images/brush.jpg")} /> */}
      <div >
        <h1 id="header">Makeupz</h1>
        <h5 id="motto">Register Since You Are Beautiful</h5>
      </div>
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
          id="outlined-basic"
          className="inputs"
          label="Enter Username here"
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
          Register
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
        <h4>Already Have An Account ? </h4>
        <Link id="link" to='/'>Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
