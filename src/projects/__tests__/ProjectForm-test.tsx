import React from 'react';
import { ShallowWrapper, shallow, HTMLAttributes } from 'enzyme';
import { UnconnectedProjectForm } from '../ProjectForm';
import { Project } from '../Project';

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

  const changeValue = (inputWrapper, newValue) => {
    inputWrapper.simulate('change', {
      target: { ...inputWrapper.props(), value: newValue }
    });
  };

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('renders project prop properly', () => {
    expect(nameWrapper.props().value).toEqual(project.name);
    expect(descriptionWrapper.props().value).toEqual(project.description);
  });

  test('should allow users to update form ', () => {
    const updatedProject = new Project({
      name: 'Ghost Protocol',
      description:
        'Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...'
    });

    nameWrapper.simulate('change', {
      target: { type: 'text', name: 'name', value: 'updated project' }
    });

    const updatedNameWrapper = wrapper.find('input[name="name"]');
    console.log(updatedNameWrapper.debug());
    expect(updatedNameWrapper.props().value).toBe('updated project');
    
    // expect(wrapper.state('project').name).toEqual('updated project');
    // changeValue(descriptionWrapper, updatedProject.description);

    // descriptionWrapper = wrapper.find('textarea[name="description"]');

    // expect(descriptionWrapper.props().value).toEqual(
    //   updatedProject.description
    // );
  });

  test('should call onSave when submitted ', () => {
    const formWrapper = wrapper.find('form');
    formWrapper.simulate('submit', { preventDefault: () => {} });
    expect(handleSave).toHaveBeenCalledWith(project);
  });

  // test('should display required validation message if name not provided', () => {
  //   changeValue(nameWrapper, 'fdkk');
  //   expect(nameWrapper.props().value).toEqual('fdkk');
  //   const nameRequiredWrapper = wrapper.find('div.card.error');
  //   // debugger;
  //   // console.log(nameRequiredWrapper);
  //   // //console.log(nameRequiredWrapper.html());
  //   // expect(nameRequiredWrapper).toBeDefined();
  // });
});
