import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div>
          <Link to='/'>ARCHIVE</Link>
        </div>
      </div>
    );
  }
}

export default Header;
