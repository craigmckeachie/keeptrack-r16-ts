import React, { Fragment } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import { Project } from './Project';

interface ProjectsPageState {
  projects: Project[];
}

class ProjectsPage extends React.Component<any, ProjectsPageState> {
  state = {
    projects: MOCK_PROJECTS
  };
  saveProject = (project: Project) => {
    this.setState((previousState: ProjectsPageState) => {
      let projects = previousState.projects.map((p: Project) => {
        return p.id === project.id ? project : p;
      });
      return { projects };
    });
  };
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        <ProjectList onSave={this.saveProject} projects={this.state.projects} />
      </Fragment>
    );
  }
}

export default ProjectsPage;
