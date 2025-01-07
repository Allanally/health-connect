/* eslint-disable prettier/prettier */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      ['inline-import', { 'extensions': ['.sql'] }]
    ]
  };
};