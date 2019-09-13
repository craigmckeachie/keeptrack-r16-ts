import React from 'react';
import { Project } from './Project';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
}

class ProjectList extends React.Component<ProjectListProps> {
  render() {
    const { projects } = this.props;
    const items = projects.map(project => (
      <div key={project.id} className="cols-sm">
        <ProjectCard project={project} />
      </div>
    ));
    return <div className="row">{items}</div>;
  }
}

export default ProjectList;
