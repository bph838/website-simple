const { SITE_TITLE } = require("./constants");

import { setupMenuCommands } from "./menu/menu";
import { renderEvents } from "./pages/calendar";

import data from "../data/pages/calendar.json";
console.log(data);

setupMenuCommands(document, "page-calendar");
renderEvents(data);
