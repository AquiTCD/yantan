// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    'comma-dangle': [2, 'always-multiline'],
    'no-console': 1,
    'eol-last': 0,
    'block-scoped-var': 0,
    'complexity': 1,
    'consistent-return': 1,
    'default-case': 1,
    'eqeqeq': 1,
    'no-alert': 1,
    'no-caller': 1,
    'no-eval': 2,
    'no-extra-semi': 1,
    'no-global-assign': 1,
    'no-new': 0,
    'no-new-func': 1,
    'no-proto': 2,
    'no-script-url': 1,
    'no-self-compare': 1,
    'no-undef': 2,
    'no-void': 2,
    'no-var': 2,
    'camelcase': 1,
    'key-spacing': [2, {'beforeColon': false, 'afterColon': true, 'align': 'colon'}],
    'no-array-constructor': 1,
    'quotes': [1, 'single'],
    'no-unused-vars': 2,
    'space-after-keywords': 0,
    'space-before-blocks': [0, { 'functions': 'always' }],
    'space-infix-ops': 0,
    'space-return-throw-case': 0,
    'comma-spacing': 0,
    'prefer-const': 0,
    'curly': 0,
    'object-curly-spacing': [2, 'always', { 'arraysInObjects': false, 'objectsInObjects': false }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
