const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderEvents } from "./pages/events";    


import data from '../data/pages/events.json';  
console.log(data);
setupMenuCommands(document, "page-events");
renderEvents(data);
initCopyrightYear();
initMenuName(SITE_TITLE);

document.addEventListener("DOMContentLoaded", () => {
  
});
