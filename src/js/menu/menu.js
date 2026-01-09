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

export function setupMenuCommands() {
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  if (navLinks.length == 0) return;
  const navbarCollapseEl = document.querySelector(".navbar-collapse");
  if (navbarCollapseEl.length == 0) return;
  const navbarCollapse = new Collapse(navbarCollapseEl, { toggle: false });

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

      // Wait for collapse animation to finish
      setTimeout(() => {
        console.log("Menu Clicked");
        scrollToElement(el);
      }, 300); // Bootstrap collapse animation duration
    });
  });
}
