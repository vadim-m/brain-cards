import { createElement } from "../js/helpers/createElement.js";

export const createHeader = (parent) => {
  const container = createElement("div", {
    className: "container header__container",
  });
  parent.append(container);

  const headerLogoLink = createElement("a", {
    href: "#",
    className: "header__logo-link",
  });

  const headerLogo = createElement("img", {
    src: "img/logo.svg",
    className: "header__logo",
    alt: "Brain Cards Logo",
  });
  headerLogoLink.append(headerLogo);

  const headerTitle = createElement("h2", {
    className: "header__subtitle",
    textContent: "Категории",
  });
  container.append(headerTitle);

  const updateHeaderTitle = (text) => {
    headerTitle.textContent = text;
  };

  const headerBtn = createElement("button", {
    className: "header__btn",
    textContent: "Добавить категорию",
  });

  container.append(headerLogoLink, headerTitle, headerBtn);

  return {
    headerLogoLink,
    headerBtn,
    updateHeaderTitle,
  };
};
