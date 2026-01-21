import { renderHero } from "../components/hero";
import { renderSection } from "../components/section";


export function renderIndex(data) {
  const contentarea = document.getElementById("contentarea");
  if (!contentarea) {
    console.error("There is no contentarea id to render to");
    return;
  }
  if (!data.content) {
    console.error("There is data content to render from");
    return;
  }
  
  //If there is a hero image render it
  if (data.content.hero) 
    renderHero(data.content.hero);

    //render each section
  if (data.content.sections) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    contentarea.appendChild(sectionsDiv);

    data.content.sections.forEach((section) => {
      renderSection(sectionsDiv, section);
    });
  }
}
