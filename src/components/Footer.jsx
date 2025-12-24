import React from 'react';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <p>Contact: haeha2e@gmail.com</p>
      <p>© 2025 Ha Sung Min. All rights reserved.</p>
      <div className="social-links">
        {/* rel 속성 추가됨 */}
        <a href="https://github.com/hsm9411" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </footer>
  );
}

export default Footer;