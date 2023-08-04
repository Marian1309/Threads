/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json'
      }
    ],
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json'
      }
    ]
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
