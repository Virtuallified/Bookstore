module.exports = {
  globalSetup: "<rootDir>/tools/setup.js",
  globalTeardown: "<rootDir>/tools/teardown.js",
  setupFilesAfterEnv: ["<rootDir>/tools/jest.setup.js"],
  testMatch: ["<rootDir>/tests/**/*.(spec|test).js"],
  verbose: true,
};
