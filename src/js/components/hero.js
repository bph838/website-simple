
export function renderHero(app, data) {
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

/*
  // Render hero
  const heroDiv = document.createElement("div");
  heroDiv.className = "hero";
  heroDiv.innerHTML = `
  <img src="${data.content.hero.image}" alt="Hero Image">
  <h1>${data.content.hero.text}</h1>
`;
  app.appendChild(heroDiv); */

/*
 <section class="hero d-flex align-items-center text-white">
      <div class="container text-center">
        <h1 class="display-4 fw-bold">Chiltern Delay Analysise</h1>
      </div>
    </section>
    */
