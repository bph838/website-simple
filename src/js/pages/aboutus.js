import { renderHero } from "../components/hero";
import { renderSection } from "../components/section";
import { initMapFrame } from "../components/map";

export function renderAboutUs(data) {
  console.log("Rendering About Us Page");
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

  //Render Find Us section
  renderFindUsSection(data.content.findus, contentarea);
}

function renderFindUsSection(sectionData, contentarea) {
  if (!sectionData) return;

  const findusDiv = document.createElement("div");
  findusDiv.className = "findus";
  findusDiv.id = "findus";
  contentarea.appendChild(findusDiv);
  renderSection(findusDiv, sectionData);

  const mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapDiv.style.width = "100%";
  mapDiv.style.height = "400px";
  contentarea.appendChild(mapDiv);
  //Initialize map
  initMapFrame(sectionData.mapCoordinates);
}
