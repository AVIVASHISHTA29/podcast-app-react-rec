import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="navbar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath == "/" ? "active" : ""}>
          Signup
        </Link>
        <Link
          to="/podcasts"
          className={currentPath == "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath == "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header;
