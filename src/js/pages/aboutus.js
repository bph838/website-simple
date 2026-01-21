import { renderHero } from "../components/hero";
import { renderSection } from "../components/section";
import { initMap } from "../components/map";


export function renderAboutUs(data) {
  console.log("Rendering About Us Page");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  const contentarea = document.getElementById("contentarea");



  renderFindUsSection(data.content.findus,contentarea);


}

function renderFindUsSection(sectionData,contentarea) {
  if (!sectionData) return;

  const findusDiv = document.createElement("div");
  findusDiv.className = "findus";
  contentarea.appendChild(findusDiv);
  renderSection(findusDiv, sectionData);

  const mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapDiv.style.width = "100%";
  mapDiv.style.height = "400px";
  contentarea.appendChild(mapDiv);
    //Initialize map
    initMap(sectionData.mapCoordinates);

}