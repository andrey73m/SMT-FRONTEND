module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ["react",'react-refresh', "@typescript-eslint"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any":0,
    "react-hooks/exhaustive-deps":0,
    "eqeqeq": "warn",
    "no-trailing-spaces": ["warn", { "skipBlankLines": true }],
    "object-curly-spacing": [
      "warn", "always"
    ],
    "space-infix-ops": ["warn"],
    "arrow-spacing": [
      "warn", { "before": true, "after": true }
    ],
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "double"
    ]
  },
}
