export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // permette import da file .ts senza estensione .js
  },
  globalSetup: '<rootDir>/backend/src/test/globalSetup.js',
  globalTeardown: '<rootDir>/backend/src/test/globalTeardown.js',
  setupFilesAfterEnv: ['<rootDir>/backend/src/test/setupFileAfterEnv.js'],
}
