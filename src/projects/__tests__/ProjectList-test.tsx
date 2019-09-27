import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import ProjectList, { ProjectListProps } from '../ProjectList';
import { Project } from '../Project';
import { MOCK_PROJECTS } from '../MockProjects';
import { ProjectCardProps } from '../ProjectCard';

describe('<ProjectList />', () => {
  let wrapper: ShallowWrapper;
  let mockProjects: Project[];

  beforeEach(() => {
    mockProjects = MOCK_PROJECTS;
    wrapper = shallow(<ProjectList projects={mockProjects} />);
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('renders <ProjectCard/>s', () => {
    const projectCardWrapper = wrapper.find('ProjectCard');
    expect(projectCardWrapper.length).toBe(mockProjects.length);
  });

  test('render <ProjectForm> for editingProject', () => {
    wrapper.setState({ editingProject: mockProjects[2] });
    // expect(wrapper.instance().state.editingProject).toBe(mockProjects[2]);
    expect(wrapper.find('Connect(ProjectForm)').length).toBe(1);
  });

  test('snapshot', () => {
    // wrapper.setState({ editingProject: mockProjects[2] });
    expect(wrapper).toMatchSnapshot();
  });
});
