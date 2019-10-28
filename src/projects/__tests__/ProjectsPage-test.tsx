import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { UnconnectedProjectsPage } from '../ProjectsPage';
import { MOCK_PROJECTS } from '../MockProjects';
import { ProjectListProps } from '../ProjectList';

describe('<ProjectsPage>', () => {
  let wrapper: ShallowWrapper;
  let onLoadMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <UnconnectedProjectsPage
        onLoad={onLoadMock}
        projects={MOCK_PROJECTS}
        page={1}
      />
    );
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('onLoad should be called with page number', () => {
    const pageNumber = 1;
    expect(onLoadMock).toBeCalledWith(pageNumber);
  });

  test('renders <ProjectList />', () => {
    let projectListWrapper = wrapper.find('ProjectList');
    expect(projectListWrapper.length).toBe(1);
    expect((projectListWrapper.props() as ProjectListProps).projects).toBe(
      MOCK_PROJECTS
    );
  });

  test('error displays', () => {
    wrapper.setProps({ error: 'Fail' });
    expect(wrapper.find('div.error').text()).toContain('Fail');
  });

  test('loading indicator displays', () => {
    wrapper.setProps({ loading: true });
    const spinnerWrapper = wrapper.find('span.spinner');
    expect(spinnerWrapper.exists()).toBeTruthy();
  });

  test('When clicking more records...onLoad should be called with next page number', () => {
    const moreButton = wrapper.findWhere(
      element => element.type() === 'button' && element.text() === 'More...'
    );
    expect(moreButton.exists()).toBeTruthy();
    moreButton.simulate('click');
    expect(onLoadMock).toBeCalledWith(2);
  });

  test('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
