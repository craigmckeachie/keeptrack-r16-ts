import React, { SyntheticEvent } from 'react';
import { Project } from './Project';

interface ProjectFormProps {
  onSave: (project: Project) => void;
  onCancel: () => void;
}

class ProjectForm extends React.Component<ProjectFormProps> {
  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.onSave(new Project({ name: 'Updated Project' }));
  };
  render() {
    const { onCancel } = this.props;
    return (
      <form
        className="input-group vertical"
        onSubmit={event => {
          this.handleSubmit(event);
        }}
      >
        <label htmlFor="name">Project Name</label>
        <input type="text" name="name" placeholder="enter name" />
        <label htmlFor="description">Project Description</label>
        <textarea name="description" placeholder="enter description" />
        <label htmlFor="budget">Project Budget</label>
        <input type="number" name="budget" placeholder="enter budget" />
        <label htmlFor="isActive">Active?</label>
        <input type="checkbox" name="isActive" />
        <div className="input-group">
          <button className="primary bordered medium">Save</button>
          <span />
          <button type="button" className="bordered medium" onClick={onCancel}>
            cancel
          </button>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
