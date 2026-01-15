// Import our custom CSS
import "../scss/styles.scss";


import 'bootstrap';  

//import $ from "jquery";
import { setupMenuCommands } from "./menu/menu";
import { initCopyrightYear } from "./components/copyrightYear";
import { renderHomepage } from "./components/page";

import data from '../data/pages/homepage.json';  
console.log(data);
setupMenuCommands(document,"page-home");
renderHomepage(data);  
initCopyrightYear();