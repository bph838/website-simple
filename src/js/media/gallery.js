const { SITE_TITLE } = require("../constants");

import { setupMenuCommands } from "../menu/menu";
import { renderGallery } from "../pages/media/gallery";

import data from "../../data/pages/media/gallery.json";
console.log(data);

setupMenuCommands(document, "page-gallery");
renderGallery(data);
