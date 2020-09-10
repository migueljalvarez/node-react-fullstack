'use strict'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12.13',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
