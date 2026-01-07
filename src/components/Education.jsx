import React from 'react';

function Education() {
  const educations = [
    {
      id: 1,
      period: "2025.05 ~ 2025.08",
      course: "Intel AI Master 임베디드 과정",
      org: "청년취업사관학교",
      desc: "리눅스 기반 임베디드 환경에서 카메라·통신(UART/SPI/I2C) 기초, OpenCV 영상처리, OpenVINO 기반 AI 추론·최적화, Geti/OTX를 활용한 MLOps 흐름, Docker·Git 협업, LLM·RAG 시스템 기초를 학습했습니다."
    }
  ];

  return (
    <section id="education" className="section-wrapper">
      <div className="container">
        <h2>Education</h2>
        <div className="timeline-section">
          {educations.map((edu) => (
            <div key={edu.id} className="timeline-card">
              <div className="timeline-header">
                <span className="timeline-role">{edu.course}</span>
                <span className="timeline-date">{edu.period}</span>
              </div>
              <strong className="timeline-org">{edu.org}</strong>
              <p className="timeline-desc">{edu.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;