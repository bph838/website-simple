// Import our custom CSS
import "../scss/styles.scss";

// Import only the Bootstrap components we need
//import { Popover, Collapse } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear } from "./components/copyrightYear";
import { renderPage } from "./components/page";

import data from '../data/site.json';  
console.log(data);

document.addEventListener("DOMContentLoaded", () => {
  renderPage(data);
  //setupMenuCommands();
  //initCopyrightYear();
});
