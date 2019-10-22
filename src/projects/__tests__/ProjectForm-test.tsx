import React from 'react';
import { ShallowWrapper, shallow, HTMLAttributes } from 'enzyme';
import { UnconnectedProjectForm } from '../ProjectForm';
import { Project } from '../Project';

const changeValue = (inputWrapper, newValue) => {
  inputWrapper.simulate('change', {
    target: { value: newValue }
  });
};

describe('<ProjectForm />', () => {
  let wrapper: ShallowWrapper;
  let project: Project;
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

  describe('update form', () => {
    test('should allow users to update form ', () => {
      const updatedProject = new Project({
        name: 'Ghost Protocol',
        description:
          'Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...'
      });
      changeValue(nameWrapper, updatedProject.name);
      changeValue(descriptionWrapper, updatedProject.description);

      expect(nameWrapper.props().value).toEqual(project.name);
      expect(descriptionWrapper.props().value).toEqual(project.description);
    });
  });
});
