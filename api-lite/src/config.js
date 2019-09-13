export const app = {
  env: process.env.APP_ENV || "dev",
  debug: process.env.APP_DEBUG === "true" ? true : false,
};

export default {
  app,
};
