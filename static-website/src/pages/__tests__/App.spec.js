import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('test App main', () => {
  it('should render correctly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
