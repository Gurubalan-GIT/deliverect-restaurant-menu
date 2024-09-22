/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/modules/$1",
    "^@components/(.*)$": "<rootDir>/common/components/$1",
    "^@utils/(.*)$": "<rootDir>/common/utils/$1",
    "^@zustand/(.*)$": "<rootDir>/zustand/$1",
    "^@assets/(.*)$": "<rootDir>/public/assets/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
