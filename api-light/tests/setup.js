import * as config from "../src/config";

/**
 * Mock the environment for this test
 */
config.app = {
  ...config.app,
  env: "testing",
  debug: true
};
