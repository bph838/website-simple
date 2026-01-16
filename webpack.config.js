"use strict";
"use strict";

const fs = require("fs");
const path = require("path");

const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const { SITE_TITLE } = require("./src/js/constants.js");
const { loadEnvFile } = require("process");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",

    entry: {
      index: "./src/js/index.js", // for index.html
      events: "./src/js/events.js", // for events.html
      aboutus: "./src/js/aboutus.js", // for about.html
    },
    output: {
      filename: "[name].bundle.js", // main.bundle.js, about.bundle.js
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },

    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 8080,
      hot: true,
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/data", to: "data" },
          { from: "src/images", to: "images" },
          { from: "src/favicon.ico", to: "." },
          { from: "src/site.webmanifest", to: "." },
        ],
      }),

      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/templates/main.html",
        chunks: ["index"], // only include index.js
        title: SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },

        navigation: fs.readFileSync(
          path.resolve(__dirname, "src/partials/navigation.html"),
          "utf8"
        ),
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/partials/footer.html"),
          "utf8"
        ),
      }),
      new HtmlWebpackPlugin({
        filename: "events.html",
        template: "./src/templates/main.html",
        chunks: ["events"], // only include events.js
        title: "Events - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: fs.readFileSync(
          path.resolve(__dirname, "src/partials/navigation.html"),
          "utf8"
        ),
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/partials/footer.html"),
          "utf8"
        ),
      }),
      new HtmlWebpackPlugin({
        filename: "aboutus.html",
        template: "./src/templates/main.html",
        chunks: ["aboutus"], // only include about.js
        title: "About - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: fs.readFileSync(
          path.resolve(__dirname, "src/partials/navigation.html"),
          "utf8"
        ),
        footer: fs.readFileSync(
          path.resolve(__dirname, "src/partials/footer.html"),
          "utf8"
        ),
      }),

      new HtmlWebpackPartialsPlugin({
        path: path.join(__dirname, "./src/partials/navigation.html"),
        location: "body",
        template_filename: "*.html",
      }),

      /*new HtmlWebpackPartialsPlugin({
        path: path.join(__dirname, "./src/partials"),
        location: "body",
        priority: "replace",
        template_filename: "*.html",
        options: {
          navigation: {
            template: "navigation.html",
          },
          footer: {
            template: "footer.html",
          },
        },
      }),*/
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
