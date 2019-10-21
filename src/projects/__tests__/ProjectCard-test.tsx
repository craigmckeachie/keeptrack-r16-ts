import { ShallowWrapper, shallow } from 'enzyme';
import ProjectCard from '../ProjectCard';
import React from 'react';
import { Project } from '../Project';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('<ProjectCard />', () => {
  let wrapper: ShallowWrapper;
  let project: Project;
  let handleEdit: jest.Mock;

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: 'Mission Impossible',
      description: 'This is really difficult',
      budget: 100
    });
    handleEdit = jest.fn();
    wrapper = shallow(<ProjectCard project={project} onEdit={handleEdit} />);
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('renders project prop properly', () => {
    const h5 = wrapper.find('h5');
    const descriptionParagraph = wrapper.find('p').first();
    const budgetParagraph = wrapper
      .find('p')
      .filterWhere(n => n.text().startsWith('Budget :'));

    expect(h5.text()).toContain(project.name);
    //how to replace formatDescription, watch first video of React Testing Recipes or Cookbook
    // see https://jestjs.io/docs/en/mock-functions#mocking-modules
    expect(descriptionParagraph.text()).toEqual(project.description + '...');
    expect(budgetParagraph.text()).toContain('100');
  });

  test('handler prop called when edit clicked', () => {
    const editButton = wrapper.find('button');
    editButton.simulate('click');
    expect(handleEdit).toBeCalledWith(project);
  });

  test('snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectCard project={project} onEdit={handleEdit} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
