// stylelint.config.js
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    indentation: 2,
    'keyframes-name-pattern': '^[a-z-]+$',
    'declaration-block-single-line-max-declarations': 1,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
  },
};
