import React from 'react';
import { Project } from './Project';

interface ProjectListProps {
  projects: Project[];
}

class ProjectList extends React.Component<ProjectListProps> {
  render() {
    const { projects } = this.props;
    const items = projects.map(project => (
      <div key={project.id} className="cols-sm">
        <div className="card">
          <img src={project.imageUrl} alt={project.name} />
          <section className="section dark">
            <h5 className="strong">
              <strong>{project.name}</strong>
            </h5>
            <p>{project.description}</p>
            <p>Budget : {project.budget.toLocaleString()}</p>
          </section>
        </div>
      </div>
    ));
    return <div className="row">{items}</div>;
  }
}

export default ProjectList;
