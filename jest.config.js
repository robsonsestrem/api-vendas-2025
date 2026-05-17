const { pathsToModuleNameMapper } = require('ts-jest');
const tsconfig = require('./tsconfig.build.json');

const paths = { ...tsconfig.compilerOptions.paths };

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
  },
  testRegex: '.*\.(spec|test|int-spec)\.ts$',
  transform: {
    '^.+\.(t|j)s$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
