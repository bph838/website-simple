const { SITE_TITLE } = require("../constants");

import { setupMenuCommands } from "../menu/menu";
import { renderVideos } from "../pages/media/videos";

import data from "../../data/pages/media/videos.json";
console.log(data);

setupMenuCommands(document, "page-videos");
renderVideos(data);
