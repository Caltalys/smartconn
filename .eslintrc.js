module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import"],
  extends: [
    "next/core-web-vitals", // next + react + a11y
    "plugin:@typescript-eslint/recommended", // rules cho TS
    "plugin:import/recommended", // rules cho import
    "plugin:import/typescript", // support TS imports
    "plugin:jsx-a11y/recommended", // a11y rules
    "eslint:recommended",
    "prettier", // fix conflict với Prettier nếu dùng
  ],
  rules: {
    // ⚡ TS rules
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",

    // ⚡ React rules
    "react/react-in-jsx-scope": "off", // Next.js tự handle React
    "react/no-unescaped-entities": "warn",

    // ⚡ Next.js rules
    "@next/next/no-img-element": "warn",

    // ⚡ Import rules
    "import/order": [
      "warn",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
        ],
        pathGroups: [
          { pattern: "react", group: "external", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "off",

    // ⚡ General
    "no-console": ["warn", { allow: ["warn", "error"] }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
