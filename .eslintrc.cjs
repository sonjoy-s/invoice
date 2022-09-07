module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "@vue/typescript/recommended", "prettier"]
};
