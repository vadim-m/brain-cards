import { createCategory } from "../components/createCategory.js";
import { createHeader } from "../components/createHeader.js";
import { createElement } from "./helpers/createElement.js";
import { fetchCategories } from "./service/service.js";

const initApp = async () => {
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector("#app");

  const headerObj = createHeader(headerEl);
  const mainObj = createCategory(mainEl);

  const renderIndex = async (e) => {
    e?.preventDefault();
    const categories = await fetchCategories();
    if (categories.error) {
      app.append(
        createElement("p", {
          className: "server-error",
          textContent: "Ошибка сервера, попробуйте зайти позже!",
        })
      );
      return;
    }
    mainObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener("click", renderIndex);
  headerObj.headerBtn.addEventListener("click", () => {
    mainObj.unmount();
    headerObj.updateHeaderTitle("Новая категория");
  });
};

initApp();
