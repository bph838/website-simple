const { SITE_TITLE } = require("../constants");

import { setupMenuCommands } from "../menu/menu";
import {renderClubRules} from "../pages/club/clubrules";

import data from '../../data/pages/club/clubrules.json';  
console.log(data);

setupMenuCommands(document,"page-clubrules");
renderClubRules(data)