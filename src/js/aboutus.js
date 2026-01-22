const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { renderAboutUs } from "./pages/aboutus";

import data from "../data/pages/aboutus.json";

setupMenuCommands(document, "page-aboutus");
renderAboutUs(data);
