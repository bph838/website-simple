import { renderHero } from "../../components/hero";
import { renderSection } from "../../components/section";

export function renderClubNews(data) {
  console.log("Rendering Club News Page");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  const contentarea = document.getElementById("contentarea");

  //Render other sections
  if (data.content.sections && data.content.sections.length > 0) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    contentarea.appendChild(sectionsDiv);

    const newsSections = data.content.sections;
    newsSections.sort(
      (a, b) =>
        new Date(b.date.replace(" ", "T")) - new Date(a.date.replace(" ", "T")),
    );

    data.content.sections.forEach((section) => {
      renderSection(sectionsDiv, section);
    });
  }
}

export function renderClubNewsItem(data) {
  console.log("Rendering Club News Page Item");
  //Render section
  const contentarea = document.getElementById("contentarea");
  const sectionsDiv = document.createElement("div");
  sectionsDiv.className = "sectionitem";
  contentarea.appendChild(sectionsDiv);

  renderSection(sectionsDiv, data);
}
