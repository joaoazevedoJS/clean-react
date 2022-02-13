/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  entry: "./src/main/index.tsx",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    publicPath: path.resolve(__dirname, "public", "js"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "scss"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.resolve(__dirname, "public"),
      watch: true,
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new DefinePlugin({
      "process.env.API_URL": "http://fordevs.herokuapp.com/api",
    }),
  ].filter(Boolean),
};
