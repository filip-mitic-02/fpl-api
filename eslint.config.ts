import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Apply ESLint's recommended rules for JavaScript
  js.configs.recommended,

  // Apply TypeScript ESLint recommended rules
  ...tsEslint.configs.recommended,

  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
]);
