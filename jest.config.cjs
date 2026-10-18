const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  cacheDirectory: "<rootDir>/node_modules/.cache/jest",
  passWithNoTests: true,
  modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/out/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  watchPathIgnorePatterns: ["<rootDir>/.next/"],
};

module.exports = createJestConfig(config);
