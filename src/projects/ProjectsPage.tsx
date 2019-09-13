import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';

class ProjectsPage extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
      </Fragment>
    );
  }
}

export default ProjectsPage;
