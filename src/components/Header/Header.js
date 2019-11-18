import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="logo">Where's my money</h1>
        <ul className="navMenu">
          <li>Strona główna</li>
          <li>O programie</li>
        </ul>
      </div>
    );
  }
}

export default Header;
