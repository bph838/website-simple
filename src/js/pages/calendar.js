import { renderHero } from "../components/hero";
import { renderSection } from "../components/section";

export function renderEvents(data) {
  console.log("Rendering Events Page");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);


}





