import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    semi: true,
    quotes: "double",
    indent: 2,
  },
  rules: {
    "no-console": "off",
    "node/prefer-global/buffer": "off",
    "node/prefer-global/url": "off",
    "node/prefer-global/url-search-params": "off",
    "antfu/if-newline": "off",
  },
});
