const { SITE_TITLE } = require("./constants");
// Import our custom CSS
import "../scss/styles.scss";


import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear, initMenuName } from "./components/pageupdates";
import { renderIndex } from "./pages/index";
import { renderAlerts } from "./components/alerts";


import data from '../data/pages/homepage.json';  
console.log(data);
setupMenuCommands(document,"page-home");
renderIndex(data);  
renderAlerts();  
initCopyrightYear();
initMenuName(SITE_TITLE);
