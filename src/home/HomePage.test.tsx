import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  test('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  test('renders title tag', () => {
    expect(wrapper.exists('h2')).toBeTruthy();
  });

  test('renders title', () => {
    expect(wrapper.find('h2').text()).toBe('Home');
  });
});
