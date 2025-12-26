import React from 'react';
// 스크립트가 생성할 JSON 파일을 import 합니다.
// (처음엔 파일이 없어서 에러처럼 보일 수 있지만, npm run dev 하면 생깁니다)
import projectData from '../data/projects.json';

function Projects() {
  // 데이터가 없을 경우를 대비해 빈 배열 처리
  const projects = projectData || [];

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <h2>Projects</h2>
        
        {/* 데이터가 비었을 때 안내 문구 */}
        {projects.length === 0 && (
          <p>등록된 프로젝트가 없습니다. (Notion 상태를 확인해주세요)</p>
        )}

        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* 커버 이미지가 있으면 표시 */}
              {project.cover && (
                <img 
                  src={project.cover} 
                  alt={project.title} 
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="tech-stack">
                {project.tech.map((t, index) => (
                  <span key={index} className="tech-badge">#{t}</span>
                ))}
              </div>
              
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
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