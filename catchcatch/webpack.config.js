const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./source/main.js",
  output: { path: path.resolve(__dirname, "source"), filename: "main.js" },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "source", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
