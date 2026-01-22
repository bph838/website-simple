const { SITE_TITLE } = require("../constants");

import { setupMenuCommands } from "../menu/menu";
import { renderClubMerch } from "../pages/club/clubmerch";

import data from "../../data/pages/club/clubmerch.json";
console.log(data);

setupMenuCommands(document, "page-clubmerch");
renderClubMerch(data);
