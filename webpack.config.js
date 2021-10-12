/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  node: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    publicPath: path.resolve(__dirname, "public", "js"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    react: "React", // Não vai incluir o react no bundle.
    "react-dom": "ReactDom",
  },
  plugins: [new CleanWebpackPlugin()],
};
