import { fixupPluginRules } from '@eslint/compat'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginNext from '@next/eslint-plugin-next'
import globals from 'globals'

export default tseslint.config(
    // Global ignores
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'public/**'],
    },

    // Base ESLint recommended rules
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.jest,
            },
        },
    },

    // TypeScript files configuration
    ...tseslint.configs.recommended,

    // React configuration
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': fixupPluginRules(pluginReactHooks),
            'jsx-a11y': pluginJsxA11y,
            '@next/next': pluginNext,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // React rules
            ...pluginReact.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],

            // React Hooks rules
            ...pluginReactHooks.configs.recommended.rules,

            // JSX A11y rules
            ...pluginJsxA11y.configs.recommended.rules,

            // Next.js rules
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
        },
    }
)
