import { createHeader } from "../components/createHeader.js";

const initApp = () => {
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector("#app");

  const returnIndex = (e) => {
    e.preventDefault();
    headerObj.updateHeaderTitle("Категории");
  };

  const headerObj = createHeader(headerEl);
  headerObj.headerLogoLink.addEventListener("click", returnIndex);
  headerObj.headerBtn.addEventListener("click", () => {
    headerObj.updateHeaderTitle("Новая категория");
  });
};

initApp();
