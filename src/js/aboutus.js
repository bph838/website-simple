// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear } from "./components/copyrightYear";
import { renderPage } from "./components/page";

import data from '../data/site.json';  
console.log(data);
setupMenuCommands(document, "page-aboutus");
renderPage(data);
initCopyrightYear();

document.addEventListener("DOMContentLoaded", () => {
  
});
