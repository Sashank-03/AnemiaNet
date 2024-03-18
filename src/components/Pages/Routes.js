import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Predict from "../Integration/Predict";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { MdBubbleChart } from "react-icons/md";
import Home from "./Home";
import AboutUs from "./AboutUs";
import "./routes.css";
import HowToUse from "./HowToUse";
import History from "./History";
const Routing = () => {
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleClick = () => {
    // Toggle the checked status
    setIsChecked(!isChecked);
  };

  return (
    <Router>
      <div className="all">
        <nav className="navbar">
          <div className="logo__id">
            <div className="logo">
              <MdBubbleChart style={{ fontSize: "4em", color: "#1A5A71" }} />
            </div>
            <div className="navcontent">
              <h3
                style={{
                  fontWeight: "normal",
                  fontSize: "1.5rem",
                  margin: "0",
                }}
              >
                AnemiaNet
              </h3>
            </div>
            
            <div className="hamburger-lines" onClick={handleClick}>
              <span className={!isChecked ? "line line1" : "line line1 line1_trns"}></span>
              <span className={!isChecked ? "line line2" : "line line2 line2_trns"}></span>
              <span className={!isChecked ? "line line3" : "line line3 line3_trns"}></span>
            </div>
          </div>
          <div className="page_routes">
            <ul>
              <li>
                <Link to="/">
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link to="/prediction">
                  <p>Prediction</p>
                </Link>
              </li>
              <li>
                <Link to="/howtouse">
                  <p>How to use</p>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link to="/history">
                  <p>History</p>
                </Link>
              </li>
              <li onClick={userSignOut}>
                <p>Sign Out</p>
              </li>
            </ul>
          </div>
        </nav>

          {isChecked && <div className="page_routes_2">
            <ul>
              <li className="home2">
                <Link to="/">
                  <p >Home</p>
                </Link>
              </li>
              <li>
                <Link to="/prediction">
                  <p>Prediction</p>
                </Link>
              </li>
              <li>
                <Link to="/howtouse">
                  <p>How to use</p>
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link to="/history">
                  <p>History</p>
                </Link>
              </li>
              <li onClick={userSignOut}>
                <p>Sign Out</p>
              </li>
            </ul>
          </div>}

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Predict />} />
            <Route path="/howtouse" element={<HowToUse />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default Routing;
