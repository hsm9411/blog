import React from 'react';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <p>Contact: myemail@example.com</p>
      <p>© 2025 Hong Gil Dong. All rights reserved.</p>
      <div className="social-links">
        <a href="https://github.com/hsm9411" target="_blank">GitHub</a>
        {/* 블로그 주소 등 추가 */}
      </div>
    </footer>
  );
}

export default Footer;