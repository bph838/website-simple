const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderEvents } from "./components/page-events";

setupMenuCommands(document, "page-events");
renderEvents();
initCopyrightYear();
initMenuName(SITE_TITLE);

document.addEventListener("DOMContentLoaded", () => {});
