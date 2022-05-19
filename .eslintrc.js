module.exports = {
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react-hooks'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'rules': {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        quotes: ['error', 'single'],
        'semi-style': ['error', 'last'],
        semi: ['error', 'always'],
        'no-unused-vars': ["error", { "vars": "local", "args": "none", "ignoreRestSiblings": true }]
    },
    'settings': {
        'react': {
            'pragma': 'React',
            'version': 'detect'
        }
    }
}
