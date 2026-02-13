import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly'
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'react-refresh': refreshPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  prettier
];
