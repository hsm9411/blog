import React from 'react';

function About() {
  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="text-box">
            <p>
              안녕하세요! 사용자 경험을 최우선으로 생각하는 개발자입니다.
              <br />
              다크 모드와 반응형 디자인을 고려하여 깔끔한 웹을 만듭니다.
            </p>
          </div>
          {/* (Skills 부분은 그대로 두거나 필요하면 추가) */}
        </div>
      </div>
    </section>
  );
}

export default About;