import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import "./style.css";
import { Link } from "react-router-dom";
import { db, auth } from '../../firebase'
import { useHistory } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);
        history.push('/home')

      }else{
        //logged out
        setUser(null);
        console.log('Not logged')
      }
    })

    return ()=>{
      //some clean ups
      unsubscribe()
    }
  },[user, username])

  const handleSubmit = (event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=>alert(error.message))
  }
  return (
    <div className="sec login2">
      {/* <img src={require("../../images/brush.jpg")} /> */}
      <div>
        <h1 id="header">Makeupz</h1>
        <h5 id="motto">Register Since You Are Beautiful</h5>
      </div>
      <form id="form" onSubmit={(event)=>handleSubmit(event)}>
        <TextField
          id="outlined-basic"
          className="inputs"
          label="Enter Your Email"
          variant="outlined"
          size="small"
          value={email}
          color="secondary"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label style={{ height: "10px" }}></label>
        <TextField
          id="outlined-basic"
          className="inputs"
          label="Enter Username here"
          variant="outlined"
          size="small"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          color="secondary"
        />
        <label style={{ height: "10px" }}></label>
        <TextField
          color="secondary"
          id="outlined-basic"
          className="inputs"
          label="Enter Password here"
          variant="outlined"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          size="small"
        />
        <label style={{ height: "10px" }}></label>

        <Button
          style={{ background: "orange", marginBottom: "20px" }}
          variant="contained"
          type="submit"
          // onClick={()=>handleSubmit}
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
        <Link id="link" to="/">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
