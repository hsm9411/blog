import React from 'react';

const projects = [
  {
    id: 1,
    title: "나의 포트폴리오 사이트",
    description: "React와 GitHub Actions를 이용해 제작한 정적 웹사이트입니다.",
    tech: ["React", "Vite", "CSS"],
    link: "https://github.com/hsm9411/blog" 
  },
  {
    id: 2,
    title: "투두 리스트 (Todo List)",
    description: "기본적인 CRUD 기능을 구현한 할 일 관리 앱입니다.",
    tech: ["JavaScript", "LocalStorage"],
    link: "#" // 나중에 링크 채워넣기
  },
  // 여기에 프로젝트를 계속 추가하면 됩니다.
];

function Projects() {
  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((t, index) => (
                  <span key={index} className="tech-badge">{t}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" className="project-link">
                View Code →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;