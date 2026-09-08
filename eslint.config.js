const js = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");
const globals = require("globals");
const tseslint = require("typescript-eslint")

module.exports = [
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];