import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { db, auth } from '../../firebase'
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState('')
  let history = useHistory();
  const handleSubmit = (event)=>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then(()=> history.push('/home'))
    .catch((error)=>alert(error.message))
  }
  
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user has logged in
        console.log(authUser);
        // setUser(authUser);
        history.push('/home')

      }else{
        //logged out
        // setUser(null);
        console.log('Not logged')
      }
    })

    return ()=>{
      //some clean ups
      unsubscribe()
    }
  },[])
  return (
    <div>
      <div className="sec login">
        {/* <img src={require("../../images/lipstick.jpg")} /> */}
        <h1>Makeupz</h1>
        <h5>The Best Place To Grow Your Beauty</h5>
        <div className="cont1">
          <h4>Already Have An Account ?</h4>
          <form id="form" onSubmit={(e)=>handleSubmit(e)}>
            <TextField
              id="outlined-basic"
              className="inputs"
              label="Enter Your Email here"
              variant="outlined"
              size="small"
              color="secondary"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label style={{ height: "10px" }}></label>
            <TextField
              // password={true}
              type='password'
              value={password}
              onChange={(e)=>SetPassword(e.target.value)}
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
              type="submit"
            >
              Log In
            </Button>
          </form>
          <div
            style={{
              display: "flex",
              marginTop: "50px",
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
