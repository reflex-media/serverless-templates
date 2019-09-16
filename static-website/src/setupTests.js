// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16';

// Add test-specific environment configurations
process.env.REACT_APP_ENV = 'test';
process.env.REACT_APP_DEBUG = true;

configure({ adapter: new Adapter() });
