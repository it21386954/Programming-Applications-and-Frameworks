import React from "react";
import "./Header.css";

import profileImage from "../../images/Niki.jpg";
export default function Header({ authenticated, onLogout, currentUser }) {
  return (
    <nav>
      <div className="container">
        <h2 className="logo" style={{color : `White`, fontFamily : `sans-serif`}}>BodyBlitz</h2>
        <div className="search-bar">
          <i className="uil uil-search" />
          <input
            type="search"
            placeholder="search"
          />
        </div>
        <div className="create">
          {/* <label className="btn btn-primary" htmlFor="create-post">
            Create
          </label> */}
          <div className="profile-photo">
            <img src={profileImage} alt="profile1" />
          </div>
          <li >
            <a onClick={onLogout} style={{color : `White`, fontFamily : `sans-serif`}}>
              logout
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
}
