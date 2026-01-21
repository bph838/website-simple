const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderAboutUs } from "./pages/aboutus";

import data from '../data/pages/aboutus.json';  

setupMenuCommands(document, "page-aboutus");
renderAboutUs(data);
initCopyrightYear();
initMenuName(SITE_TITLE);

document.addEventListener("DOMContentLoaded", () => {
  
});
