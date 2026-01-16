const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";


import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderHomepage } from "./components/page";
import { renderAlerts } from "./components/alerts";


import data from '../data/pages/homepage.json';  
console.log(data);
setupMenuCommands(document,"page-home");
renderHomepage(data);  
renderAlerts();  
initCopyrightYear();
initMenuName(SITE_TITLE);
