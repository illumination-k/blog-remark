export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
