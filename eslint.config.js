// eslint.config.js
export default [
  {
    files: ["src/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
    },
  },
];
