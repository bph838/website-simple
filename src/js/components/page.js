export function renderPage(data) {
    console.log("Render");
  const app = document.getElementById("app");

  // Render hero
  const heroDiv = document.createElement("div");
  heroDiv.className = "hero";
  heroDiv.innerHTML = `
  <img src="${data.content.hero.image}" alt="Hero Image">
  <h1>${data.content.hero.text}</h1>
`;
  app.appendChild(heroDiv);
}
