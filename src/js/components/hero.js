
export function renderHero(data) {
    console.log("renderHero");
  const heroSection = document.createElement("section");
  heroSection.className = "hero";
  if (data.image) {
    heroSection.style.backgroundImage = "url('"+data.image+"')";
    heroSection.style.backgroundPosition = "center";
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundRepeat = "no-repeat";
  }

  if (data.text) {
    const heroTextDiv = document.createElement("div");
    heroTextDiv.className = "container text-center";
    heroSection.appendChild(heroTextDiv);

    const heroTextH1 = document.createElement("H1");
    heroTextH1.innerHTML = data.text;    
    heroTextDiv.appendChild(heroTextH1);
  }

  app.appendChild(heroSection); 
}
