// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      {/* 이 div가 있어야 1200px 안쪽으로 내용이 모입니다 */}
      <div className="navbar-container">
        <div className="navbar-logo">My Portfolio</div>
        <ul className="navbar-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;