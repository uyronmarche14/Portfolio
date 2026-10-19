import nextVitals from "eslint-config-next/core-web-vitals";

export default [
    ...nextVitals,
    {
        files: ["**/*.{js,jsx,mjs,ts,tsx}"],
        // React-compiler rules flag existing code; warn until the redesign phases rewrite those files.
        rules: {
            "react-hooks/refs": "warn",
            "react-hooks/set-state-in-effect": "warn",
            "react-hooks/static-components": "warn",
        },
    },
    {
        ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**"]
    }
];
