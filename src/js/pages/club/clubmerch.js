import { renderHero } from "../../components/hero";
import { renderSection,renderPDFLinks } from "../../components/section";

export function renderClubMerch(data) {
  console.log("Rendering Club Merch Page");

  if (data.content.hero) renderHero(data.content.hero);

  const contentarea = document.getElementById("contentarea");

  //Render other sections
  if (data.content.sections && data.content.sections.length > 0) {
    const sectionsDiv = document.createElement("div");
    sectionsDiv.className = "sections";
    contentarea.appendChild(sectionsDiv);

    data.content.sections.forEach((section) => {
      const div = renderSection(sectionsDiv, section);
      renderPDFLinks(div,section);
      renderClubMerchItems(div, section);
      renderClubMerchSize(div, section);
    });
  }
}

function renderClubMerchItems(div, section) {
  console.log("Rendering Club Merch");
  if (!section.merch) return;

  div.style.display = "block";

  const merchDiv = document.createElement("section");
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

function renderClubMerchSize(div, section) {
  console.log("Rendering Club Merch Size");
  if (!section.merch) return;

  div.style.display = "block";

  const merchDiv = document.createElement("section");
  merchDiv.className = "merchsize";
  div.appendChild(merchDiv);

  const merchsizetitle = document.createElement("h2");  
  merchsizetitle.innerHTML = "Size Guide";
  merchDiv.appendChild(merchsizetitle);

  const merchsizeimg1 = document.createElement("img");  
  merchsizeimg1.src = "/images/merch/SIZE-GUIDE.png"
  merchDiv.appendChild(merchsizeimg1);


    const merchsizeimg2 = document.createElement("img");  
  merchsizeimg2.src = "/images/merch/SIZE-GUIDE-2.png"
  merchDiv.appendChild(merchsizeimg2);

}
