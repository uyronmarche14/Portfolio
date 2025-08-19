import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Project-wide settings & ignore patterns for a more flexible default
    ignores: ["node_modules/", ".next/", "dist/", "out/"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Main ruleset — relaxed for easy deployment
  {
    rules: {
      // Import ordering rules (relaxed)
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          "newlines-between": "ignore",
        },
      ],

      // TypeScript specific rules (very forgiving)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],

      // Relaxed rules for easy deployment
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      // React specific rules (relaxed)
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-key": "off",
      "react/jsx-no-duplicate-props": "off",
      "react/jsx-no-undef": "off",
      "react/jsx-uses-vars": "off",

      // General code quality rules (relaxed)
      "no-console": "off",
      "no-debugger": "warn",
      "no-duplicate-imports": "warn",
      "no-unused-expressions": "warn",
      "prefer-const": "warn",
      "no-var": "warn",

      // Code style rules (relaxed)
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "quote-props": ["warn", "as-needed"],

      // Performance rules (relaxed)
      "react-hooks/rules-of-hooks": "warn",

      // Accessibility rules (relaxed)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  },

  // Targeted overrides for test files, scripts, and specific patterns
  {
    files: ["**/*.test.*", "**/*.spec.*", "**/__tests__/**"],
    rules: {
      // Tests often use any and temporary patterns — be permissive here
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  },
  {
    files: ["scripts/**", "next.config.*", "webpack.config.*", "*.config.*"],
    rules: {
      // Node/script configs may use require/any
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Ensure type-only imports remain enforced for TS files
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
    },
  },
];

export default eslintConfig;
