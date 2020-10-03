import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import "./style.css";
function Profile() {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(user);
  }, [user]);

  const getData = async (us) => {
    const res = await db
      .collection("users")
      .where("email", "==", us.email)
      .get()
      .then((q) => {
        q.forEach((dd) => {
          setUser(dd.data());
        });
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in
        // console.log(authUser);
        getData(authUser);
        // setUser(authUser);
      } else {
        //
      }
    });

    return () => {
      //some clean ups
      unsubscribe();
    };
  }, []);
  return (
    <div className="profilecontainer">
      <div className="pheader">
        <h3>Profile</h3>
      </div>

      <img
        src={require("../../images/bg.jpg")}
        className="bbbb"
        alt="lipstrick"
      />
      <div className="profilepiccontainer">
        <img src={require("../../images/lady.png")} alt="h" className="img" />
      </div>
      <div className="banner">
        <div>
          <div className="pblock1">
            <h4>{user.username}</h4>
          </div>
        </div>

        <div className="pblock2">
          <div className="stats">
            <h2>{user.followers}</h2>
            <h6>Followers</h6>
          </div>

          <hr></hr>

          <div className="stats">
            <h2>{user.following}</h2>
            <h6>Following</h6>
          </div>

        </div>
        <div className='details'>
            <div className='listOF'>
                <h4>Posts : 10</h4>
            </div>
            <div className='listOF'>
                <h4>Videos : 10</h4>
            </div>
            <div className='listOF'>
                <h4>Go Credit : 100</h4>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
