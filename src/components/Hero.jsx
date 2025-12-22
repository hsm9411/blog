import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>안녕하세요,<br />개발자 <span className="highlight">하성민</span>입니다.</h1>
        <p> 발전하기위해 노력합니다.</p>
        <a href="#projects" className="cta-button">프로젝트 보러가기</a>
      </div>
    </section>
  );
}

export default Hero;