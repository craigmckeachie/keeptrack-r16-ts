import React, { useState, useEffect } from 'react';
import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';
import { Project } from './Project';

interface ProjectPageState {
  loading: boolean;
  project: Project | undefined;
  error: string | undefined;
}

const ProjectPage: React.FC<ProjectPageState> = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(undefined);
  const [error, setError] = useState(undefined);
  const id = Number(props.match.params.id);
  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(id)
      .then((data) => {
        setLoading(false);
        setProject(data);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  }, [id]);

  return (
    <React.Fragment>
      <h1>Project Detail</h1>

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span> {error}
              </p>
            </section>
          </div>
        </div>
      )}

      {project && <ProjectDetail project={project} />}
    </React.Fragment>
  );
};

export default ProjectPage;
