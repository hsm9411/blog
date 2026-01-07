import React from 'react';

function Experience() {
  const experiences = [
    {
      id: 1,
      period: "2025.09 ~ 2025.10",
      role: "일경험 인턴",
      org: "서울현대교육재단 (Zest CNS Co., Ltd.)",
      desc: "Spring MVC(JSP) 기반 게시판 예제를 통해 백엔드 CRUD 흐름을 학습하고, REST API로 분리하여 React·Vue 프론트엔드와 연동하는 과정을 실습했습니다."
    }
  ];

  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline-section">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-card">
              <div className="timeline-header">
                <span className="timeline-role">{exp.role}</span>
                <span className="timeline-date">{exp.period}</span>
              </div>
              <strong className="timeline-org">{exp.org}</strong>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;