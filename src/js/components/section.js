import { makeSafeId } from "../functions/links";

export function renderSection(sectionsDiv, data) {
  if (!data) {
    console.error("There is no data to render");
    return;
  }
  if (!data.type) {
    console.error("There is no section type to render");
    return;
  }

  if (process.env.NODE_ENV === "development") {
    if (data.title) {
      console.log(`Rendering Section ${data.title}`);
    } else {
      console.log(`Rendering Section`);
    }
  }

  let classname = data.class || "";
  const pageSection = renderSectionHolder(sectionsDiv);

  //if there is a title lets render it
  if (data.title) {
    const titleSectionDiv = document.createElement("div");
    titleSectionDiv.className = "sectionTitle";
    pageSection.appendChild(titleSectionDiv);
    const titleText = document.createElement("h2");
    titleText.innerHTML = data.title;
    titleSectionDiv.appendChild(titleText);

    if (data.date) {
      const date = new Date(data.date);
      const text = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

      const titleTextBar = document.createElement("div");      
      titleTextBar.className="sectionheader";
      titleSectionDiv.appendChild(titleTextBar);

      const titleDateText = document.createElement("span");
      titleDateText.innerHTML = text;
      titleDateText.className = "sectiondate";
      titleTextBar.appendChild(titleDateText);

      //create a link <i class="fa-solid fa-link"></i>
      let linkId = makeSafeId(data.title + "-" + data.date);
      let newsUrl = `/club/clubnews.html#${linkId}`;
      titleSectionDiv.id = linkId;

      const titleLink = document.createElement("a");
      titleLink.innerHTML = "<i class='fa-solid fa-link'></i>";
      titleLink.className = "sectionlink";
      titleLink.href = newsUrl;
      titleLink.target = "_blank";      
      titleTextBar.appendChild(titleLink);
    }
  }

  const titleSectionInfoDiv = document.createElement("div");
  titleSectionInfoDiv.className = "sectionInfoHolder " + classname;
  pageSection.appendChild(titleSectionInfoDiv);

  switch (data.type) {
    case "wrappedTextLeft":
      renderSectionWrappedTextLeft(titleSectionInfoDiv, data);
      break;
    case "leftImage":
      renderSectionLeftImage(titleSectionInfoDiv, data);
      break;
    case "rightImage":
      renderSectionRightImage(titleSectionInfoDiv, data);
      break;
    case "noImage":
      renderSectionNoImage(titleSectionInfoDiv, data);
      break;
  }  

  return titleSectionInfoDiv;
}

function renderSectionHolder(sectionsDiv) {
  const pageSection = document.createElement("section");
  pageSection.className = "section ";
  sectionsDiv.appendChild(pageSection);

  const pageSectionFlexDiv = document.createElement("div");
  pageSectionFlexDiv.className = "sectionContent";
  pageSection.appendChild(pageSectionFlexDiv);

  return pageSectionFlexDiv;
}

function renderSectionWrappedTextLeft(pageSection, data) {
  if (!data.text || !data.image) {
    console.error("Unable to render renderSectionWrappedTextLeft");
    return;
  }

  const sectionImageDiv = document.createElement("div");
  sectionImageDiv.className = "sectionImageWrapDiv";
  pageSection.appendChild(sectionImageDiv);

  const sectionImage = document.createElement("img");
  sectionImage.src = data.image;
  sectionImageDiv.appendChild(sectionImage);

  const sectionTextDiv = document.createElement("div");
  sectionTextDiv.className = "sectionTextDiv";
  pageSection.appendChild(sectionTextDiv);

  data.text.forEach((text) => {
    renderSectionText(sectionTextDiv, text);
  });

  //If there are any pdf links to render
  renderPDFLinks(pageSection, data);
}

function renderSectionLeftImage(pageSection, data) {
  if (!data.text || !data.image) {
    console.error("Unable to render renderSectionWrappedTextLeft");
    return;
  }

  pageSection.style.display = "flex";
  // Optionally, you can add other flex properties
  pageSection.style.flexDirection = "row"; // or "column"

  const sectionImageDiv = document.createElement("div");
  sectionImageDiv.className = "sectionImageLeftDiv";
  pageSection.appendChild(sectionImageDiv);

  const sectionImage = document.createElement("img");
  sectionImage.src = data.image;
  sectionImageDiv.appendChild(sectionImage);

  const sectionTextDiv = document.createElement("div");
  sectionTextDiv.className = "sectionTextDiv";
  pageSection.appendChild(sectionTextDiv);

  data.text.forEach((text) => {
    renderSectionText(sectionTextDiv, text);
  });
}

function renderSectionRightImage(pageSection, data) {
  if (!data.text || !data.image) {
    console.error("Unable to render renderSectionWrappedTextLeft");
    return;
  }

  pageSection.style.display = "flex";
  // Optionally, you can add other flex properties
  pageSection.style.flexDirection = "row"; // or "column"

  const sectionTextDiv = document.createElement("div");
  sectionTextDiv.className = "sectionTextDiv";
  pageSection.appendChild(sectionTextDiv);

  data.text.forEach((text) => {
    renderSectionText(sectionTextDiv, text);
  });

  const sectionImageDiv = document.createElement("div");
  sectionImageDiv.className = "sectionImageRightDiv";
  pageSection.appendChild(sectionImageDiv);

  const sectionImage = document.createElement("img");
  sectionImage.src = data.image;
  sectionImageDiv.appendChild(sectionImage);
}

function renderSectionNoImage(pageSection, data) {
  if (!data.text) {
    console.error("Unable to render renderSectionWrappedTextLeft");
    return;
  }

  pageSection.style.display = "flex";
  pageSection.style.flexDirection = "row"; // or "column"

  const sectionTextDiv = document.createElement("div");
  sectionTextDiv.className = "sectionTextDiv";
  pageSection.appendChild(sectionTextDiv);

  data.text.forEach((text) => {
    renderSectionText(sectionTextDiv, text);
  });
}

function renderSectionText(pageSection, text) {
  const sectionParatext = document.createElement("p");
  sectionParatext.innerHTML = text;
  pageSection.appendChild(sectionParatext);
}

export function renderPDFLinks(pageSection, data) {
  console.log("Checking for PDF links to render");
  if (data.pdfs && data.pdfs.length > 0) {
    const pdfsDiv = document.createElement("div");
    pdfsDiv.className = "pdfLinks";
    pageSection.appendChild(pdfsDiv);

    data.pdfs.forEach((pdf) => {
      const pdfDiv = document.createElement("div");
      pdfDiv.className = "pdfdoc";
      pdfsDiv.appendChild(pdfDiv);

      const pdfLink = document.createElement("a");
      pdfLink.href = pdf.url;
      pdfLink.target = "_blank";
      pdfDiv.appendChild(pdfLink);

      const imgPDF = document.createElement("img");
      imgPDF.src = "/images/pdf.png";
      imgPDF.class = "pdfimage";
      pdfLink.appendChild(imgPDF);

      const spanPDF = document.createElement("span");
      spanPDF.innerHTML = pdf.text;
      spanPDF.class = "pdfimagedesc";
      pdfLink.appendChild(spanPDF);
    });
  }
}
