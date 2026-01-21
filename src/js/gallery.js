const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

import "bootstrap";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderGallery } from "./pages/gallery";

import data from "../data/pages/gallery.json";
console.log(data);
setupMenuCommands(document, "page-gallery");
renderGallery(data);
initCopyrightYear();
initMenuName(SITE_TITLE);
