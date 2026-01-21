import { renderHero } from "../../components/hero";
import { renderSection } from "../../components/section";

export function renderClubMerch(data) {
  console.log("Rendering Club Merch Page");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  const contentarea = document.getElementById("contentarea");

  //Render other sections
  if (data.content.sections && data.content.sections.length > 0) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    contentarea.appendChild(sectionsDiv);

    data.content.sections.forEach((section) => {
      const div = renderSection(sectionsDiv, section);
      renderClubMerchItems(div, section);
    });
  }
}

function renderClubMerchItems(div, section) {
    console.log("Rendering Club Merch");
  if (!section.merch) return;

  //div.styles += "flex-wrap: wrap;";
  div.style.flexWrap = 'wrap';

   
  const merchDiv = document.createElement("div");
  merchDiv.className = "merch";
div.appendChild(merchDiv);

  section.merch.forEach((merch) => {
    const merchItemDiv = document.createElement("div");
    merchItemDiv.className = "merchholder";
    merchDiv.appendChild(merchItemDiv);

    if (merch.picture && merch.picture.length > 1) {
      const merchItemPic = document.createElement("img");
      merchItemPic.className = "merchpicture";
      merchItemPic.src = merch.picture;
      merchItemDiv.appendChild(merchItemPic);
    }
console.log("ls");
    if (merch.desc && merch.desc.length > 1) {
        
      const merchItemDesc = document.createElement("img");
      merchItemDesc.className = "merchdesc";
      merchItemDesc.src = merch.desc;
      merchItemDiv.appendChild(merchItemDesc);
    }
  });
}
