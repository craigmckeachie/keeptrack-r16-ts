import React from 'react';
import { Project } from './Project';

interface ProjectListProps {
  projects: Project[];
}

class ProjectList extends React.Component<ProjectListProps> {
  render() {
    const { projects } = this.props;
    return <pre>{JSON.stringify(projects, null, ' ')}</pre>;
  }
}

export default ProjectList;
