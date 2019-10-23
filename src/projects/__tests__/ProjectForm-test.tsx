import React from 'react';
import { ShallowWrapper, shallow, HTMLAttributes } from 'enzyme';
import { UnconnectedProjectForm } from '../ProjectForm';
import { Project } from '../Project';

describe('<ProjectForm />', () => {
  let wrapper: ShallowWrapper;
  let project: Project;
  let updatedProject: Project;
  let handleSave: jest.Mock;
  let handleCancel: jest.Mock;
  let nameWrapper: ShallowWrapper<HTMLAttributes>;
  let descriptionWrapper: ShallowWrapper<HTMLAttributes>;

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: 'Mission Impossible',
      description: 'This is really difficult',
      budget: 100
    });
    updatedProject = new Project({
      name: 'Ghost Protocol',
      description:
        'Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...'
    });
    handleSave = jest.fn();
    handleCancel = jest.fn();
    wrapper = shallow(
      <UnconnectedProjectForm
        project={project}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
    nameWrapper = wrapper.find('input[name="name"]');
    descriptionWrapper = wrapper.find('textarea[name="description"]');
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('renders project prop properly', () => {
    expect(nameWrapper.props().value).toEqual(project.name);
    expect(descriptionWrapper.props().value).toEqual(project.description);
  });

  test('should allow users to update name ', () => {
    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: updatedProject.name }
    });

    const updatedNameWrapper = wrapper.find('input[name="name"]');
    expect(updatedNameWrapper.props().value).toBe(updatedProject.name);
  });

  test('should allow users to update description ', () => {
    descriptionWrapper.simulate('change', {
      target: {
        type: 'textarea',
        name: 'description',
        value: updatedProject.description
      }
    });

    const updatedDescriptionWrapper = wrapper.find(
      'textarea[name="description"]'
    );
    expect(updatedDescriptionWrapper.props().value).toBe(
      updatedProject.description
    );
  });

  test('should call onSave when submitted ', () => {
    const formWrapper = wrapper.find('form');
    formWrapper.simulate('submit', { preventDefault: () => {} });
    expect(handleSave).toHaveBeenCalledWith(project);
  });

  test('should display required validation message if name not provided', () => {
    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: '' }
    });

    const validationErrorWrapper = wrapper.find('div.card.error');
    expect(validationErrorWrapper.length).toBe(1);
  });

  test('should not display required validation message if name is provided', () => {
    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: 'abc' }
    });

    const validationErrorWrapper = wrapper.find('div.card.error');
    expect(validationErrorWrapper.length).toBe(0);
  });

  test('should display minlength validation message if name is too short', () => {
    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: 'ab' }
    });

    const validationErrorWrapper = wrapper.find('div.card.error');
    expect(validationErrorWrapper.length).toBe(1);
  });

  test('should not display minlength validation message if name is long enough', () => {
    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: 'abc' }
    });

    const validationErrorWrapper = wrapper.find('div.card.error');
    expect(validationErrorWrapper.length).toBe(0);
  });
});
