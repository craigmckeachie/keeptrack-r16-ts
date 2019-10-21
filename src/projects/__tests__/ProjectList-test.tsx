import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import ProjectList from '../ProjectList';
import { Project } from '../Project';
import { MOCK_PROJECTS } from '../MockProjects';

// jest.mock('../ProjectCard', () => () => 'ProjectCard');
// jest.mock('../ProjectForm', () => () => 'ProjectForm');

describe('<ProjectList />', () => {
  let wrapper: ShallowWrapper;
  let mockProjects: Project[];
  let handleSave: jest.Mock;

  beforeEach(() => {
    mockProjects = MOCK_PROJECTS;
    wrapper = shallow(
      <ProjectList projects={mockProjects} onSave={handleSave} />
    );
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
    expect(wrapper.find('Connect(ProjectForm)').length).toBe(1);
  });

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // test('snapshot', () => {
  //   const tree = renderer
  //     .create(
  //       <MemoryRouter>
  //         <ProjectList projects={mockProjects} onSave={handleSave} />
  //       </MemoryRouter>
  //     )
  //     .toJSON();

  //   expect(tree).toMatchSnapshot();
  // });
});

// https://www.npmjs.com/package/enzyme-to-json
//https://github.com/adriantoine/enzyme-to-json-v3-testing/blob/master/package.json
// npm install --save-dev enzyme-to-json
// "jest": {
//   "snapshotSerializers": [
//     "enzyme-to-json/serializer"
//   ]
// }
//stop/ start npm test for serializer to be used
