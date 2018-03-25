module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false
    }],
    "@babel/preset-typescript"
  ],
  "plugins": [
    // "@babel/plugin-external-helpers",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ],
  "only": [
    "src/**"
  ]
};
