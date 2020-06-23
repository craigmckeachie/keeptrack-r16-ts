import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';

function ProjectsPage() {
  return (
    <Fragment>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} />
    </Fragment>
  );
}

export default ProjectsPage;
