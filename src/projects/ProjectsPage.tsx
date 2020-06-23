import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';

function ProjectsPage() {
  return (
    <Fragment>
      <h1>Projects</h1>
      <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
    </Fragment>
  );
}

export default ProjectsPage;
