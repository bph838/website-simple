const { SITE_TITLE } = require("../constants");

export function renderNavigation(elNav, data) {
  const navContainer = document.createElement("div");
  navContainer.className = "container-fluid";
  elNav.appendChild(navContainer);
  renderNavigationButton(navContainer);

  const navBarContainer = document.createElement("div");
  navBarContainer.id = "navbarNav";
  navBarContainer.className = "collapse navbar-collapse";
  navContainer.appendChild(navBarContainer);

  const navBarList = document.createElement("ul");
  navBarList.className = "navbar-nav";
  navBarContainer.appendChild(navBarList);

  if (data.sections) {
    data.sections.forEach((item) => {
      console.log(item);
      renderNavBarItem(navBarList, item);
    });
  }
}

function renderNavigationButton(elNav) {
  const navButton = document.createElement("button");
  navButton.className = "navbar-toggler";
  navButton.type = "button";
  navButton.setAttribute("data-bs-toggle", "collapse");
  navButton.setAttribute("data-bs-target", "#navbarNav");
  navButton.setAttribute("aria-controls", "navbarNav");
  navButton.setAttribute("aria-expanded", "false");
  navButton.setAttribute("aria-label", "Toggle navigation");
  elNav.appendChild(navButton);

  const navSpanIcon = document.createElement("span");
  navSpanIcon.className = "navbar-toggler-icon";
  navButton.appendChild(navSpanIcon);
  const navSpanText = document.createElement("span");
  navSpanText.className = "collapsed-text";
  navSpanText.innerHTML = SITE_TITLE;
  elNav.appendChild(navSpanText);
}

function renderNavBarItem(el, item) {
  const navBarList = document.createElement("li");
  navBarList.className = "nav-item";
  el.appendChild(navBarList);

  if (item.id) {
    const navBarLink = document.createElement("a");
    navBarLink.className = "nav-link active";
    navBarLink.setAttribute("aria-current", "page");
    navBarLink.setAttribute("href", "#");
    navBarLink.setAttribute("data-menu", item.id);

    if (item.iconClass) {
      const navBarIcon = document.createElement("i");
      navBarIcon.className = item.iconClass;
      navBarLink.appendChild(navBarIcon);
    }
    navBarLink.innerHTML += item.title;
    navBarList.appendChild(navBarLink);
  }
}
