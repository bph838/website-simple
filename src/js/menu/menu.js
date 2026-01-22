/**
 * Sets up click handlers for navbar links to:
 * 1. Mark the clicked link as active.
 * 2. Close the Bootstrap navbar collapse menu.
 * 3. Smoothly scroll to the corresponding section on the page.
 *
 * Expects each nav-link to have a `data-menu` attribute matching the ID of its target section.
 */

import { Collapse } from "bootstrap";
import { initCopyrightYear, initMenuName } from "../components/pageupdates";
const { SITE_TITLE } = require("../constants");

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

  initCopyrightYear();
  initMenuName(SITE_TITLE);
}
