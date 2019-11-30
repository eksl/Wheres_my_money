import React, { Component } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="logo">Where's my money</h1>
        <Router>
          <nav>
            <ul>
              <li>
                <NavLink to={"/"}>Strona główna</NavLink>
              </li>
              <li>
                <NavLink to={"/About"}>O programie</NavLink>
              </li>
            </ul>
          </nav>
        </Router>
      </div>
    );
  }
}

export default Header;
