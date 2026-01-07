import React from 'react';
// ▼ [변경] 사용할 아이콘들 import
import { FaLaptopCode, FaRobot, FaMicrochip, FaServer } from "react-icons/fa";

function Skills() {
  const skillCategories = [
    {
      title: "Languages & Core",
      // ▼ [변경] 이모지 문자열 대신 컴포넌트 할당
      icon: <FaLaptopCode />,
      items: [
        "Java, Python, C, C++, JavaScript",
        "Linux 개발 환경, Syscall 및 인터럽트 이해"
      ]
    },
    {
      title: "AI & Data",
      icon: <FaRobot />,
      items: [
        "Python (PyTorch, TensorFlow) 모델 학습 및 추론",
        "OpenCV 영상 전처리 & OpenVINO 최적화",
        "PyTorch → ONNX → HEF 변환 (Edge AI 가속기 적용)",
        "MLOps 기반 모델 CI/CD 파이프라인 구축"
      ]
    },
    {
      title: "Embedded & Hardware",
      icon: <FaMicrochip />,
      items: [
        "RFID ↔ Raspberry Pi 5 간 SPI 통신",
        "드라이버 API 활용 카메라 동작/출력 설정"
      ]
    },
    {
      title: "Web & DevOps",
      icon: <FaServer />,
      items: [
        "Spring, Oracle, JSP, Vue3, React 활용",
        "JSON 기반 HTTP 통신 및 REST API 구성",
        "Docker (Dockerfile, Compose) 가상환경 배포",
        "GitHub Actions & Ruleset (Branch Protection)"
      ]
    }
  ];

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <h2>Skills & Capabilities</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                {/* 아이콘 렌더링 */}
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <ul className="skill-items">
                {category.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;