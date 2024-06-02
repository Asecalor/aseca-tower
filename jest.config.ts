import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  // testPathIgnorePatterns:[
  //   ".*\\.repository\\.test\\.ts$"
  // ]
}

export default config