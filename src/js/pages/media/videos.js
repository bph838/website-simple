import { fetchJson } from "../../functions/loadData";
import { renderHero } from "../../components/hero";


let yearSections = [];

export function renderVideos(data) {
     console.log("Rendering videos");
  //If there is a hero image render it
  if (data.content.hero) renderHero(data.content.hero);
}