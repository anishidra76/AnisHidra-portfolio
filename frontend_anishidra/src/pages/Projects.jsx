import { useState, useEffect } from 'react';
import '../styles/main/projects.css'
import API_URL from '../api';


 
function Projects() {


  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/projects/projectcards/`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);



  return (
    <section id="projects">
      <h2 className="section-title gradient-text">Projects</h2>
 
      <div className="projects-grid">
        {projects.map((project) => (
          <div className="glow-card project-card" key={project.id}>
            <div className="project-thumb">
              <span className="project-tag">{project.tag} </span>
              <img src={project.image}
              alt={project.name}
              className="project-image"/>
            </div>
 
            <div className="project-body">
              <h4>{project.type}</h4>
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description}</p>
 
              <div className="project-footer">
                <div className="project-icons">
                  <a href={project.projectlink} target="_blank" rel="noopener noreferrer" aria-label="Preview">
                    <i className="fa-solid fa-link"></i>
                  </a>
                  <a href={project.sourcecodelink} target="_blank" rel="noopener noreferrer" aria-label="Source Code">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
                <a className="project-more" href={project.morelink} target="_blank" rel="noopener noreferrer">
                  more <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects