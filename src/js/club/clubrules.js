const { SITE_TITLE } = require("../constants");
// Import our custom CSS
import "../../scss/styles.scss";

import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "../menu/menu";
import { initCopyrightYear, initMenuName } from "../components/pageupdates";
import {renderClubRules} from "../pages/club/clubrules";

import data from '../../data/pages/club/clubrules.json';  
console.log(data);

setupMenuCommands(document,"page-clubrules");
renderClubRules(data)

initCopyrightYear();
initMenuName(SITE_TITLE);
