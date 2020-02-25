// // // const path = require('path');

// // // module.exports = {
// // //   entry: path.join(__dirname, '/client/src/index.jsx'),
// // //   module: {
// // //     rules: [
// // //       {
// // //         test: /\.(js|jsx)$/,
// // //         exclude: /node_modules/,
// // //         use: ['babel-loader'],
// // //       },
// // //       {
// // //         test: /\.scss$/,
// // //         loader: [
// // //           { loader: 'style-loader' },
// // //           {
// // //             loader: 'css-loader',
// // //             query: {
// // //               modules: true,
// // //               localIdentName: '[name]__[local]___[hash:base64:5]',
// // //             },
// // //           },
// // //           {
// // //             loader: 'sass-loader',
// // //           },
// // //         ],
// // //       },
// // //     ],
// // //   },
// // //   resolve: {
// // //     extensions: ['*', '.js', '.jsx', '.scss'],
// // //   },

// // //   output: {
// // //     path: path.join(__dirname, '/public'),
// // //     publicPath: '/',
// // //     filename: 'bundle.js',
// // //   },
// // // };


// // var path = require('path');

// // module.exports = {
// //   entry: './client/index.js',
// //   output: {
// //     filename: 'bundle.js',
// //     path: path.resolve(__dirname, 'public')
// //   },
// //   module: {
// //     rules: [
// //       {
// //         test: /\.js$/,
// //         exclude: /(node_modules)/,
// //         use: {
// //           loader: 'babel-loader',
// //           options: {
// //             presets: ['env', 'react']
// //           }
// //         }
// //       }
// //     ]
// //   }
// // }

// var path = require('path');
// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/dist');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'product_main_bundle.js',
//     path: DIST_DIR
//   },
//   // devtool: 'source-map',
//   module : {
//     rules : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',
//         query: {
//           presets: ['@babel/preset-react', '@babel/preset-env', 'minify'],
//           plugins: ["babel-plugin-styled-components"]
//         },
//       },
//       {
//         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'fonts/'
//             }
//           }
//         ]
//       }
//     ]
//   },
//   optimization: {
//     minimizer: [
//       new UglifyJsPlugin({
//         uglifyOptions: {
//           output: {
//             comments: false,
//           },
//         },
//       }),
//     ],
//   }
// };

var path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
