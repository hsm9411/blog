import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import projectData from '../data/projects.json';

// ▼ [변경] 아이콘 라이브러리 import
import { FaGithub } from "react-icons/fa"; // 깃허브 아이콘
import { MdClose } from "react-icons/md";  // 닫기(X) 아이콘

function Projects() {
  const projects = projectData || [];
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        <h2>Projects</h2>
        
        {projects.length === 0 && <p>등록된 프로젝트가 없습니다.</p>}

        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.cover && (
                <div className="card-img-wrapper">
                  <img src={project.cover} alt={project.title} className="card-img" />
                </div>
              )}
              
              <div className="card-body">
                <h3>{project.title}</h3>
                <p className="card-desc">{project.description}</p>
              </div>

              <div className="card-bottom">
                <div className="tech-stack-container">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <button className="btn-detail" onClick={() => openModal(project)}>
                    자세히 보기
                  </button>
                  
                  {/* ▼ [변경] 아이콘 컴포넌트 사용 */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-github-compact card-btn"
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달 창 */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              {/* ▼ [변경] 닫기 버튼 아이콘 교체 */}
              <button className="close-btn" onClick={closeModal} aria-label="Close">
                <MdClose />
              </button>
            </div>

            <div className="modal-body markdown-body">
              {selectedProject.cover && (
                <img src={selectedProject.cover} alt="cover" className="modal-cover-img" />
              )}
              <ReactMarkdown>
                {selectedProject.content || "상세 내용이 없습니다."}
              </ReactMarkdown>
            </div>

            <div className="modal-footer">
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-github-compact"
              >
                {/* ▼ [변경] 아이콘 컴포넌트 사용 */}
                <FaGithub size={18} />
                <span>GitHub Repository</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;