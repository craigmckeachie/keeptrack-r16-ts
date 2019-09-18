import React, { Fragment } from 'react';
import ProjectList from './ProjectList';
import { Project } from './Project';
import { AppState } from '../state';
import { ProjectState } from './state/projectTypes';
import { loadProjects, saveProject } from './state/projectActions';
import { connect } from 'react-redux';


class ProjectsPage extends React.Component<any> {
  state = {
    projects: [],
    loading: false,
    error: undefined,
    page: 1
  };

  loadProjects(page: number) {
    this.props.onLoad(page);
  }

  componentDidMount() {
    this.loadProjects(this.props.page);
  }

  handleMoreClick = () => {
    const nextPage = this.props.page + 1;
    this.loadProjects(nextPage);
  };

  saveProject = (project: Project) => {
    this.props.onSave(project);
  };
  render() {
    return (
      <Fragment>
        <h1>Projects</h1>
        {this.props.error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span>
                  {this.props.error}
                </p>
              </section>
            </div>
          </div>
        )}

        <ProjectList onSave={this.saveProject} projects={this.props.projects} />

        {!this.props.loading && !this.props.error && (
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

        {this.props.loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
      </Fragment>
    );
  }
}

// export default ProjectsPage;

// React Redux (connect)---------------
function mapStateToProps(state: AppState): ProjectState {
  return {
    ...state.projectState
  };
}

const mapDispatchToProps = {
  onLoad: loadProjects,
  onSave: saveProject
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPage);
