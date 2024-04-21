module.exports = {
  presets: [
    //.... Your current configuration, Check your configs carefully for this file
    [
      'module:metro-react-native-babel-preset',
      {useTransformReactJSXExperimental: true},
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-flow-strip-types'],
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin', // <--- Only add this plugin if "react-native-reanimated" is installed in your project.
  ],


};
