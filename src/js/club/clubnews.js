const { SITE_TITLE } = require("../constants");
// Import our custom CSS
import "../../scss/styles.scss";


import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "../menu/menu";
import { initCopyrightYear, initMenuName } from "../components/pageupdates";
import {renderClubNews} from "../pages/club/clubnews";

import data from '../../data/pages/club/clubnews.json';  
console.log(data);

setupMenuCommands(document,"page-clubnews");
renderClubNews(data)

initCopyrightYear();
initMenuName(SITE_TITLE);
