// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear } from "./components/copyrightYear";
import { renderEvents } from "./components/page-events";


setupMenuCommands(document, "page-events");
renderEvents();
initCopyrightYear();

document.addEventListener("DOMContentLoaded", () => {
  
});
