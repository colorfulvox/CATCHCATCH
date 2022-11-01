const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./source/main.js",
  output: { path: path.resolve(__dirname, "dist"), filename: "main.js" },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "source", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: "asset/resource",
      },
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
