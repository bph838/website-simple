/**
 * Sets up click handlers for navbar links to:
 * 1. Mark the clicked link as active.
 * 2. Close the Bootstrap navbar collapse menu.
 * 3. Smoothly scroll to the corresponding section on the page.
 *
 * Expects each nav-link to have a `data-menu` attribute matching the ID of its target section.
 */

import { Collapse } from "bootstrap";
import { scrollToElement } from "../components/scrolling";

export function setupMenuCommands(root, activeClass = "page-homee") {

  console.info("setupMenuCommands");
  const navbarCollapseEl = root.querySelector(".navbar-collapse");
  if (!navbarCollapseEl) return;
  const navbarCollapse = new Collapse(navbarCollapseEl, { toggle: false });

  //need to set acive menu item
  const navLinks = root.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {  
    const page = link.dataset.page;
    if (page === activeClass) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }  
  });

















  /*

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const menu = link.dataset.menu;
      const el = document.getElementById(menu);
      if (!el) return;

      // Active state
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Close menu FIRST
      navbarCollapse.hide();      
    });
  });*/
}
