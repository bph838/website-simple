const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderEvents } from "./pages/calendar";    


import data from '../data/pages/calendar.json';  
console.log(data);
setupMenuCommands(document, "page-calendar");
renderEvents(data);
initCopyrightYear();
initMenuName(SITE_TITLE);

document.addEventListener("DOMContentLoaded", () => {
  
});
