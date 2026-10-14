import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { importX, createNodeResolver } from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { ignores: ['build/'] },
  { files: ['**/*.{js,jsx}'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importX.flatConfigs.recommended,
  // Before the project rules, so max-len and arrow-body-style stay on.
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.js', '.jsx'] }),
      ],
    },
    rules: {
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx'] },
      ],
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'max-len': ['error', { code: 180 }],
      'spaced-comment': 'warn',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      // styled-components documents the default import
      'import-x/no-named-as-default': 'off',
    },
  },
  {
    files: ['src/**/*.test.{js,jsx}', 'src/setupTests.js'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
