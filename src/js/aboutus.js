const { SITE_TITLE } = require("./constants");

import { setupMenuCommands } from "./menu/menu";
import { renderAboutUs } from "./pages/aboutus";

import data from "../data/pages/aboutus.json";

setupMenuCommands(document, "page-aboutus");
renderAboutUs(data);
