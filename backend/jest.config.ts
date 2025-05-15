import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                // Use ts-jest for TypeScript
  testEnvironment: 'node',          // Use Node.js environment
  roots: ['<rootDir>/tests'],       // Look for tests in the ./tests directory
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Supported file extensions
  transform: {
    '^.+\\.ts$': 'ts-jest',         // Transform .ts files with ts-jest
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],// Optional setup file
  collectCoverage: true,            // Enable code coverage
  coverageDirectory: '<rootDir>/coverage', // Output coverage reports here
  coverageReporters: ['text', 'lcov'], // Generate text and lcov reports
};

export default config;