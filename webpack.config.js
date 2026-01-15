"use strict";
"use strict";

const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { SITE_TITLE } = require("./src/js/constants.js");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",

    entry: "./src/js/main.js",

    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },

    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 8080,
      hot: true,
    },

    plugins: [
      /*new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: SITE_TITLE,
      }),*/
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/images", to: "images" },
          { from: "src/favicon.ico", to: "." },
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/template.html",
        title:  SITE_TITLE,
      }),   
      new HtmlWebpackPlugin({
        filename: "about.html",
        template: "./src/template.html",
        title:  "About - " + SITE_TITLE,
      }),    
    ],

    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(scss)$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  silenceDeprecations: [
                    "color-functions",
                    "global-builtin",
                    "import",
                    "if-function",
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
      ],
    },
  };
};
