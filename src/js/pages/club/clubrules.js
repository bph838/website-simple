import { renderHero } from "../../components/hero";
import { renderSection } from "../../components/section";

export function renderClubRules(data) {
  console.log("Rendering Club Rules Page");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  const contentarea = document.getElementById("contentarea");

  //Render other sections
  if (data.content.sections && data.content.sections.length > 0) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    contentarea.appendChild(sectionsDiv);

    data.content.sections.forEach((section) => {
      renderSection(sectionsDiv, section);
    });    
  }

}

