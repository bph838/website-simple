const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

import "bootstrap";

import { setupMenuCommands } from "./menu/menu";
import { renderGallery } from "./pages/gallery";

import data from "../data/pages/gallery.json";
console.log(data);

setupMenuCommands(document, "page-gallery");
renderGallery(data);
