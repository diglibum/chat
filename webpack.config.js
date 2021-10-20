const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "chat.bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json", ".html"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      index: true,
      mimeTypes: { "text/html": ["phtml"] },
      publicPath: "/dist",
      serverSideRender: true,
      writeToDisk: true,
    },
    compress: true,
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
  ],
};
