import React, { Fragment } from 'react';
import ProjectList from './ProjectList';
import { Project } from './Project';
import { projectAPI } from './projectAPI';

interface ProjectsPageState {
  projects: Project[];
  loading: boolean;
  error: string | undefined;
  page: number;
}

class ProjectsPage extends React.Component<any, ProjectsPageState> {
  state = {
    projects: [],
    loading: false,
    error: undefined,
    page: 1
  };

  loadProjects(page: number) {
    this.setState({ loading: true });
    projectAPI
      .get(page)
      .then(data => {
        if (page === 1) {
          this.setState({ projects: data, loading: false, page });
        } else {
          this.setState(previousState => {
            return {
              projects: [...previousState.projects, ...data],
              loading: false,
              page
            };
          });
        }
      })
      .catch(error => this.setState({ error: error.message, loading: false }));
  }

  componentDidMount() {
    this.loadProjects(1);
  }

  handleMoreClick = () => {
    const nextPage = this.state.page + 1;
    this.loadProjects(nextPage);
  };

  saveProject = (project: Project) => {
    // this.setState((previousState: ProjectsPageState) => {
    //   let projects = previousState.projects.map((p: Project) => {
    //     return p.id === project.id ? project : p;
    //   });
    //   return { projects };
    // });

    projectAPI
      .put(project)
      .then(data => {
        this.setState(state => {
          let projects = state.projects.map(p => {
            return p.id === project.id ? project : p;
          });
          return { projects };
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        {this.state.error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {this.state.error}
                </p>
              </section>
            </div>
          </div>
        )}

        <ProjectList onSave={this.saveProject} projects={this.state.projects} />

        {!this.state.loading && !this.state.error && (
          <div className="row">
            <div className="col-sm-12">
              <div className="button-group fluid">
                <button
                  className="button default"
                  onClick={this.handleMoreClick}
                >
                  More...
                </button>
              </div>
            </div>
          </div>
        )}

        {this.state.loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ProjectsPage;
