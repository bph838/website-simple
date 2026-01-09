import { renderHero } from "./hero";


export function renderPage(data) {
  //find app Id to render to.
  const app = document.getElementById("app");
  if(!app){
    console.error("There is no app id to render to");
    return;
  }
  if(!data.content){
    console.error("There is data content to render from");
    return;
  }
  
  //If there is a hero image render it
  if(data.content.hero)
    renderHero(app,data.content.hero);




}
