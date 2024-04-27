import React from 'react';
import "./homepage.css";
import Navbar from "../components/navbar/Navbar";

import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="login-left--title text-center">
              Sign In
            </div>
            <div className="login-left--label text-center">
              For security purposes, please re-login to use Consult Online function
            </div>
            <div className="Homepage">
              <Login />
            </div>
          </div>
          <div className="col">
            <img src="assets/imgs/hospital.jpg" alt="" className="hero" />
            {/* <div className="background"></div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
