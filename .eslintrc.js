module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "import/prefer-default-export": "warn",
        "import/no-unresolved": "warn",
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": true
        }],
        "no-unused-vars": "warn",
        "linebreak-style": "off",
        "no-param-reassign": ["warn", {
            "props": false
        }],
        "global-require": "warn"
    }
};