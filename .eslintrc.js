// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    // "plugin:import/errors",
    // "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
  ],
  // required to lint *.vue files
  // plugins: [
  //   'prettier',
  // ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "any",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  },
  settings: {
    // "import/extensions": ['.js', '.vue', '.scss']
  }
};
