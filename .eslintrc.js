module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb-base",
        'plugin:vue/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "import/prefer-default-export": "warn",
        "import/no-unresolved": "warn",
        "import/no-extraneous-dependencies": ["warn", {
            "devDependencies": true
        }],
        "no-nested-ternary": "warn",
        "no-unused-vars": "warn",
        "linebreak-style": "off",
        "no-param-reassign": ["warn", {
            "props": false
        }],
        "global-require": "warn",
        "no-var": "warn"
    }
};