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
const generateICS = require("./src/js/functions/generate-ics.js");

const navigation = fs.readFileSync(
  path.resolve(__dirname, "src/partials/navigation.html"),
  "utf8"
);
const footer = fs.readFileSync(
  path.resolve(__dirname, "src/partials/footer.html"),
  "utf8"
);

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",

    entry: {
      index: "./src/js/index.js", // for index.html
      calendar: "./src/js/calendar.js", // for calendar.html
      gallery: "./src/js/gallery.js", // for gallery.html
      aboutus: "./src/js/aboutus.js", // for about.html
      clubnews: "./src/js/club/clubnews.js", // for club stuff
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
        navigation: navigation,
        footer: footer,
      }),
      new HtmlWebpackPlugin({
        filename: "calendar.html",
        template: "./src/templates/calendar.html",
        chunks: ["calendar"], // only include calendar.js
        title: "Calendar - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),

      new HtmlWebpackPlugin({
        filename: "gallery.html",
        template: "./src/templates/main.html",
        chunks: ["gallery"], // only include gallery.js
        title: "Gallery - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),

      new HtmlWebpackPlugin({
        filename: "aboutus.html",
        template: "./src/templates/main.html",
        chunks: ["aboutus"], // only include about.js
        title: "About - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),

      new HtmlWebpackPlugin({
        filename: "club/clubnews.html",
        template: "./src/templates/main.html",
        chunks: ["clubnews"], // only include club.js
        title: "Club News - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),
      new HtmlWebpackPlugin({
        filename: "club/clubrules.html",
        template: "./src/templates/main.html",
        chunks: ["clubrules"], // only include club.js
        title: "Club Rules - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),
      new HtmlWebpackPlugin({
        filename: "club/caa.html",
        template: "./src/templates/main.html",
        chunks: ["caa"], // only include club.js
        title: "CAA - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),
      new HtmlWebpackPlugin({
        filename: "club/clubmerch.html",
        template: "./src/templates/main.html",
        chunks: ["clubmerch"], // only include club.js
        title: "Club Merch - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        navigation: navigation,
        footer: footer,
      }),

      /////Create the ICS file for events
      {
        apply: (compiler) => {
          compiler.hooks.thisCompilation.tap(
            "GenerateICSPlugin",
            (compilation) => {
              compilation.hooks.processAssets.tap(
                {
                  name: "GenerateICSPlugin",
                  stage:
                    compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                },
                () => {
                  const icsContent = generateICS();

                  compilation.emitAsset(
                    "calendar.ics",
                    new compiler.webpack.sources.RawSource(icsContent)
                  );
                }
              );
            }
          );
        },
      },
      ///////
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
