import { renderHero } from "./hero";
import { renderSection } from "./section";

export function renderPage(data) {
  //find app Id to render to.
  const app = document.getElementById("app");
  if (!app) {
    console.error("There is no app id to render to");
    return;
  }
  if (!data.content) {
    console.error("There is data content to render from");
    return;
  }

  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  //render each section
  if (data.content.sections) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    app.appendChild(sectionsDiv);

    data.content.sections.forEach((section) => {
      renderSection(sectionsDiv, section);
    });    
  }
}
