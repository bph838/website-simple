"use strict";

const fs = require("fs");
const path = require("path");

const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const UpdateNewsHashesPlugin = require("./webpack/plugins/UpdateNewsHashesPlugin");
const SplitNewsSectionsPlugin = require("./webpack/plugins/SplitNewsSectionsPlugin");
const { SITE_TITLE } = require("./src/js/constants.js");
const { loadEnvFile } = require("process");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const generateICS = require("./src/js/functions/generate-ics.js");

const google_analytics = fs.readFileSync(
  path.resolve(__dirname, "src/partials/google_analytics.html"),
  "utf8",
);

const navigation = fs.readFileSync(
  path.resolve(__dirname, "src/partials/navigation.html"),
  "utf8",
);
const footer = fs.readFileSync(
  path.resolve(__dirname, "src/partials/footer.html"),
  "utf8",
);

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",

    entry: {
      index: "./src/js/index.js", // for index.html
      calendar: "./src/js/calendar.js", // for calendar.html
      gallery: "./src/js/media/gallery.js", 
      videos: "./src/js/media/videos.js", 
      aboutus: "./src/js/aboutus.js", // for about.html
      clubnews: "./src/js/club/clubnews.js",
      clubrules: "./src/js/club/clubrules.js",
      clubmerch: "./src/js/club/clubmerch.js",   
       styles: "./src/scss/styles.scss",  

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
        google_analytics: google_analytics,
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
        google_analytics: google_analytics,
        navigation: navigation,
        footer: footer,
      }),

      new HtmlWebpackPlugin({
        filename: "media/gallery.html",
        template: "./src/templates/main.html",
        chunks: ["gallery"], 
        title: "Gallery - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        google_analytics: google_analytics,
        navigation: navigation,
        footer: footer,
      }),
        new HtmlWebpackPlugin({
        filename: "media/videos.html",
        template: "./src/templates/main.html",
        chunks: ["videos"], 
        title: "Videos - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        google_analytics: google_analytics,
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
        google_analytics: google_analytics,
        navigation: navigation,
        footer: footer,
      }),

      new HtmlWebpackPlugin({
        filename: "club/clubnews.html",
        template: "./src/templates/main.html",
        chunks: ["clubnews"],
        title: "Club News - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        google_analytics: google_analytics,
        navigation: navigation,
        footer: footer,
      }),
      new HtmlWebpackPlugin({
        filename: "club/clubrules.html",
        template: "./src/templates/main.html",
        chunks: ["clubrules"],
        title: "Club Rules - " + SITE_TITLE,
        templateParameters: {
          siteName: SITE_TITLE,
        },
        google_analytics: google_analytics,
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
        google_analytics: google_analytics,
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
                    new compiler.webpack.sources.RawSource(icsContent),
                  );
                },
              );
            },
          );
        },
      },
      ///////
      //Update club news hash
      new UpdateNewsHashesPlugin({
        filePath: "./src/data/pages/club/clubnews.json",
      }),
      //Split the news
      new SplitNewsSectionsPlugin({
        input: "./src/data/pages/club/clubnews.json",
        outputDir: "./src/data/pages/club/clubnews",
      }),
      //css
      new MiniCssExtractPlugin({
        filename: "[name].css", // output CSS file name
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
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader, // extract CSS to separate file
            "css-loader", // translates CSS into CommonJS
            "postcss-loader", // optional, for autoprefixing
            {
              loader: "sass-loader", // compiles SCSS to CSS
              options: {
                sassOptions: {
                  quietDeps: true, // <- hides warnings from dependencies like Bootstrap
                },
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
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
