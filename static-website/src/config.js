export const app = {
  env: process.env.REACT_APP_ENV || process.env.NODE_ENV,
  debug: process.env.REACT_APP_DEBUG === "true",
};

export default {
  app,
};
