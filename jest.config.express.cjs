module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/express/**/*.test.[jt]s'],
  transform: {
    '^.+\\.ts?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'js'],
};