const { SITE_TITLE } = require("../constants");
// Import our custom CSS
import "../../scss/styles.scss";


import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "../menu/menu";
import {renderClubNews} from "../pages/club/clubnews";

import data from '../../data/pages/club/clubnews.json';  
console.log(data);

/*
// Get the anchor (hash) from the URL
const hash = window.location.hash; // "#123" or "" if none
if (hash) {
  const id = hash.substring(1); // "123"
  console.log("Anchor hash found:", id);
}
*/


setupMenuCommands(document,"page-clubnews");
renderClubNews(data)
