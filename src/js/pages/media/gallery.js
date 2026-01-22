import { fetchJson } from "../../functions/loadData";
import { renderHero } from "../../components/hero";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

let yearSections = [];

export function renderGallery(data) {
  console.log("Rendering Gallery");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);

  //need to load the gallery json from site
  const siteGalleryPath = "/data/media/gallery.json";

  const contentarea = document.getElementById("contentarea");
  if (!contentarea) {
    console.error("There is no contentarea id to render to");
    return;
  }
  if (!data.content) {
    console.error("There is data content to render from");
    return;
  }

  fetchJson(siteGalleryPath).then((galleryData) => {
    console.log("Gallery Data Loaded", galleryData);
    const externalPath = data.externalPath || "";
    if(!galleryData){
      console.log("no images");
      return;
    }
    //need to sort the images by date order
    galleryData.sort(
      (a, b) =>
        new Date(b.date.replace(" ", "T")) - new Date(a.date.replace(" ", "T")),
    );

    //create a div to hold the gallery
    const galleryDiv = document.createElement("div");
    galleryDiv.className = "gallery";
    contentarea.appendChild(galleryDiv);

    if (galleryData && Array.isArray(galleryData)) {
      galleryData.forEach((image) => {
        renderGalleryImage(image, galleryDiv, externalPath);
      });
    }

    yearSections.forEach((yearDivId) => {
      //Initialize PhotoSwipe Lightbox
      let lightbox = new PhotoSwipeLightbox({
        gallery: `#${yearDivId}`,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      lightbox.init();
    });
  });
}

function renderGalleryImage(image, galleryDiv, externalPath) {
  let imgPath = `${externalPath}/${image.name}`;
  let imgThumbNamePath = `${externalPath}/thumbnails/${image.name}`;
  let dateObj = new Date(image.date.replace(" ", "T"));
  let year = dateObj.getFullYear();

  let yearDiv = document.getElementById(`galleryyear-${year}`);
  if (!yearDiv) {
    yearDiv = document.createElement("div");
    yearDiv.id = `galleryyear-${year}`;
    yearDiv.className = "gallery-year-section";
    galleryDiv.appendChild(yearDiv);
    const yearHeader = document.createElement("h2");
    yearHeader.textContent = year;
    yearHeader.className = "gallery-year-header";
    yearDiv.appendChild(yearHeader);
    yearSections.push(yearDiv.id);
  }

  const alink = document.createElement("a");
  alink.href = imgPath;
  alink.setAttribute("data-pswp-width", image.width);
  alink.setAttribute("data-pswp-height", image.height);
  alink.target = "_blank";
  yearDiv.appendChild(alink);

  const img = document.createElement("img");
  img.src = imgThumbNamePath;
  img.alt = image.name;
  alink.appendChild(img); 
}


