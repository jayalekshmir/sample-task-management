const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./public/index.html",
  filename: "index.html",
  inject: {
    default: 'body',
    entries: {
       app: 'defer',
       vendor: 'module',
       thirdparty: 'head'
    }
  },
});

module.exports = {
  mode: "development",
  entry: ["./dist/out-babel/app.js"],
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    port: 8000
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ScriptExtHtmlWebpackPlugin({
      sync: 'important',
      defaultAttribute: 'defer',
      module: ['bundle.js']
    }),
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    modules: [
      "node_modules"
   ],
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      { test: /\.ts?$/, use: ["ts-loader"], exclude: /node_modules/ },
      {
        test: /\.js$/,
        use: {loader :'babel-loader'},
        exclude: /node_modules/,
        // query: {
        //     presets: ['es2015']
        //   }
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "[name].[ext]",
            },
          },
          // {
          //   test: /\.css$/,
          //   use: [
              // MiniCssExtractPlugin.loader,
              // {
              //   loader: 'style-loader',
                // options: { injectType: 'linkTag' }
          //     },
          //     {
          //       loader: 'css-loader',
          //       options:{
          //         modules: true
          //     }
          //   }
          //   ]
          // },
          {
            test: /\.html$/,
            loader: "html-loader",
            options: {
              esModule: true,
            },
          },
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'MyLib'
  },
  target: 'node',
  // externals: [nodeExternals()],
  externals: {
    _: 'lodash'
}
};
