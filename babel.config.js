const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': './src',
    },
  },
]);

module.exports = {
  presets,
  plugins,
};
