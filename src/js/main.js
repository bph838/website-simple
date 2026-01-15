// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear } from "./components/copyrightYear";
import { renderPage } from "./components/page";
import { renderNavigation } from "./components/navbar";

import data from '../data/site.json';  
console.log(data);

const elNav = document.getElementById("navivation");
if (elNav) {  
  console.log(data);
  renderNavigation(elNav,data);      
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage(data);
  setupMenuCommands();
  initCopyrightYear();
});
