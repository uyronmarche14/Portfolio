/** @type {import('jest').Config} */
module.exports = {
  cacheDirectory: "<rootDir>/node_modules/.cache/jest",
  passWithNoTests: true,
  modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/out/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  watchPathIgnorePatterns: ["<rootDir>/.next/"],
};
