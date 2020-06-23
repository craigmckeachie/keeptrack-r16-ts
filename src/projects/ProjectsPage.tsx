import React, { Fragment, useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';
import { Project } from './Project';

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    // console.log('Saving project: ', project);
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  return (
    <Fragment>
      <h1>Projects</h1>
      {/* <ProjectList onSave={saveProject} projects={MOCK_PROJECTS} /> */}
      <ProjectList onSave={saveProject} projects={projects} />
    </Fragment>
  );
}

export default ProjectsPage;
