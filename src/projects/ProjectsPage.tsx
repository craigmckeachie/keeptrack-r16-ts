import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';

class ProjectsPage extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        <ProjectList projects={MOCK_PROJECTS} />
      </Fragment>
    );
  }
}

export default ProjectsPage;
