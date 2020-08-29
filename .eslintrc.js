module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    'cypress/globals': true
  },
  extends: [
    'standard',
    'plugin:cypress/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: [
    'cypress'
  ],
  rules: {
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error'
  }
}
