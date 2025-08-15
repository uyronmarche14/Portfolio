const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@/components/(.*)$": "<rootDir>/app/components/$1",
    "^@/lib/(.*)$": "<rootDir>/app/lib/$1",
    "^@/content/(.*)$": "<rootDir>/app/content/$1",
    "^@/types/(.*)$": "<rootDir>/app/lib/types/$1",
    "^@/data/(.*)$": "<rootDir>/app/lib/data/$1",
    "^@/hooks/(.*)$": "<rootDir>/app/lib/hooks/$1",
    "^@/utils/(.*)$": "<rootDir>/app/lib/utils/$1",
  },
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/index.{js,jsx,ts,tsx}",
    "!app/**/*.stories.{js,jsx,ts,tsx}",
    "!app/**/*.test.{js,jsx,ts,tsx}",
    "!app/**/*.spec.{js,jsx,ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
