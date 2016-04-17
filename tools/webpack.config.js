import path from 'path';

const config = {

  context: path.resolve(__dirname, '../'),

  entry: path.resolve(__dirname, '../client.js'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../components'),
          path.resolve(__dirname, '../core'),
          path.resolve(__dirname, '../routes'),
          path.resolve(__dirname, '../client.js'),
        ],
        query: {
          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          plugins: [
            'transform-runtime'
          ]
        }
      }
    ]

  }

};

export default config;
