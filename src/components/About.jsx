import React from 'react';

function About() {
  return (
    <section id="about" className="section-container">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="text-box">
          <p>
            새로운 기술을 배우는 것을 좋아하고, 문제를 해결할 때 즐거움을 느낍니다.
            현재 React와 JavaScript를 중점적으로 학습하고 있습니다.
          </p>
        </div>
        <div className="skills-box">
          <h3>Skills</h3>
          <div className="skill-tags">
            <span>React</span>
            <span>JavaScript</span>
            <span>HTML/CSS</span>
            <span>Git</span>
            <span>Vite</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;