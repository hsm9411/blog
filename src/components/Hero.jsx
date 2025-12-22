import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>안녕하세요,<br />프론트엔드 개발자 <span className="highlight">홍길동</span>입니다.</h1>
        <p>사용자 경험을 중요시하며, 깔끔한 코드를 작성하기 위해 노력합니다.</p>
        <a href="#projects" className="cta-button">프로젝트 보러가기</a>
      </div>
    </section>
  );
}

export default Hero;