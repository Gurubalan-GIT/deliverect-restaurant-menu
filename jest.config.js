module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/modules/$1",
    "^@components/(.*)$": "<rootDir>/common/components/$1",
    "^@utils/(.*)$": "<rootDir>/common/utils/$1",
    "^@zustand/(.*)$": "<rootDir>/zustand/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "^@mocks/(.*)$": "<rootDir>/mocks/$1",
    "\\.(css|less|sass|scss|png|jpg|webp|svg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  transform: {
    ".+\\.(css|less|sass|scss|png|jpg|webp|svg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  transformIgnorePatterns: ["/node_modules/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
