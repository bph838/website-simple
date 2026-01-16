const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderPage } from "./components/page";

import data from '../data/site.json';  
console.log(data);
setupMenuCommands(document, "page-aboutus");
renderPage(data);
initCopyrightYear();
initMenuName(SITE_TITLE);

document.addEventListener("DOMContentLoaded", () => {
  
});
