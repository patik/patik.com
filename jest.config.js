/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')


/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    // moduleNameMapper: {
    //     '^@pages/(.*)$': '<rootDir>/pages/$1',
    //     '^@public/(.*)$': '<rootDir>/public/$1',
    //     '^@src/(.*)$': '<rootDir>/src/$1',
    // },
    // modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
}
