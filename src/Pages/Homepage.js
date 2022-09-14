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
      <div className="login">
        <div className="loginTop">
          <div className="loginLeft">
            <div className="title">
              For security purposes, please login to use this function.
            </div>
            <div className="Homepage">
              <Login />
            </div>
          </div>
          <div className="loginRight">
            <div className="background"></div>
          </div>
        </div>
        <div className="loginBottom"></div>
      </div>
    </>
    );
}

export default Homepage;
