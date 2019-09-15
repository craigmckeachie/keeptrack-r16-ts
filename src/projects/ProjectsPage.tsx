import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import { Project } from './Project';

class ProjectsPage extends React.Component {
  saveProject = (project: Project) => {
    console.log('Saving project: ', project);
  };
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        <ProjectList onSave={this.saveProject} projects={MOCK_PROJECTS} />
      </Fragment>
    );
  }
}

export default ProjectsPage;
