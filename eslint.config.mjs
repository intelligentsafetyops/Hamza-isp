import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    settings: { react: { version: "19.2" } }
  },
  {
    ignores: [".next/**", "node_modules/**", "out/**"]
  }
];

export default eslintConfig;
