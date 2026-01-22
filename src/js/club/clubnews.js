const { SITE_TITLE } = require("../constants");
// Import our custom CSS
import "../../scss/styles.scss";
import "bootstrap";

//import $ from "jquery";
import { setupMenuCommands } from "../menu/menu";
import { renderClubNews,renderClubNewsItem } from "../pages/club/clubnews";
import { fetchJson } from "../functions/loadData";
const newsUrl = "/data/pages/club/clubnews.json";
const newsItemUrl = "/data/pages/club/clubnews/";

//setup menu
setupMenuCommands(document, "page-clubnews");

// Get the anchor (hash) from the URL
const hash = window.location.hash; // "#123" or "" if none
if (hash) {
  const newsHash = hash.substring(1); // "123"
  console.log("Anchor hash found:",newsHash);
  let itemUrl = newsItemUrl + newsHash + ".json";
  fetchJson(itemUrl).then((data) => {
    console.log(`Looking for news item ${itemUrl}`);

    if (!data) {
      console.log("No news item to render");
      loadMainNewsPage(newsUrl);
    } else {
      renderClubNewsItem(data);
    }
  });
} else {
  loadMainNewsPage(newsUrl);
}

function loadMainNewsPage(url) {
  fetchJson(url).then((data) => {
    console.log(`Looking for news ${url}`);

    if (!data) {
      console.log("No news to render");
    } else {
      renderClubNews(data);
    }
  });
}
