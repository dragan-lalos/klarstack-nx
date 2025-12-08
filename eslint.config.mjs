import nx from '@nx/eslint-plugin';
import js from '@eslint/js';
import globals from 'globals';

import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/out/**',
      '**/out-tsc/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.nyc_output/**',
      '**/.nx/**',
      '**/.turbo/**',
      '**/.cache/**',
      '**/storybook-static/**',
      '**/tmp/**',
      '**/.tmp/**',
      '**/*.min.*',
      '**/*.map',
      '**/*.gen.*',
      '**/*.generated.*',
      '**/generated/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },

  // Base JS settings for config / tooling
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.node,
      },
    },
  },

  // Shared rules across TS/JS
  {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
            '^.*/eslint\\.config\\.[cm]?[jt]s$',
            '^.*/prettier\\.config\\.[cm]?[jt]s$',
          ],
          depConstraints: [
            // Shared može svuda
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },

            // Web scope: može web + shared
            { sourceTag: 'scope:web', onlyDependOnLibsWithTags: ['scope:web', 'scope:shared'] },

            // API scope: može api + shared
            { sourceTag: 'scope:api', onlyDependOnLibsWithTags: ['scope:api', 'scope:shared'] },

            // Apps (ako taguješ appove): mogu svoj scope + shared
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['scope:web', 'scope:api', 'scope:shared'],
            },
          ],
        },
      ],

      'no-debugger': 'error',

      // Import hygiene (safe defaults)
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], ['type']],
        },
      ],
      'import/no-duplicates': 'error',
    },
  },

  // React (applies to TSX/JSX)
  {
    files: ['**/*.{tsx,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      // React 17+ JSX transform (no need to import React)
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Next.js (only if you have Next apps)
  {
    files: ['apps/**/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Prettier compatibility: don’t let ESLint fight formatting
  // (This requires eslint-config-prettier installed; Nx preset usually handles some,
  // but explicit is safer in templates.)
  {
    rules: {
      // If Nx preset already disables stylistic rules, this is redundant (fine).
      // The heavy lifting is done by eslint-config-prettier when used via extends,
      // but in flat config we mainly rely on Nx presets + Prettier running separately.
    },
  },
];
