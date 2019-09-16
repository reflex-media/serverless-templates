import React from 'react';
import { shallow } from 'enzyme';

import HomeHero from '../HomeHero';
import { app } from '../../../config';

describe('test HomeHero molecule', () => {
  it('should render correctly', () => {
    const component = shallow(<HomeHero />);
    expect(component).toMatchSnapshot();
  });

  it('should render with debug turned off', () => {
    app.debug = false;
    const component = shallow(<HomeHero />);
    expect(component).toMatchSnapshot();
    app.debug = true;
  });
});
