// configure jest-junit
process.env.JEST_JUNIT_OUTPUT = './reports/jest/junit.xml';

// configure jest
module.exports = {
  coverageDirectory: './coverage/',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'cobertura'
  ],
  collectCoverageFrom: [
    './src/app/*.ts'
  ],
  coveragePathIgnorePatterns: [
    './src/app/cloudwatch-config-entry.ts',
    './src/app/cloudwatch-widget-entry.ts',
  ],
  preset: 'ts-jest',
  reporters: [
    'default',
    'jest-junit'
  ],
  testEnvironment: 'jsdom'
};
