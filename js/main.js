import { createCategory } from "../components/createCategory.js";
import { createEditCategory } from "../components/createEditCategory.js";
import { createHeader } from "../components/createHeader.js";
import { createElement } from "./helpers/createElement.js";
import { fetchCategories } from "./service/service.js";

const initApp = async () => {
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector("#app");

  const headerObj = createHeader(headerEl);
  const categoryObj = createCategory(mainEl);
  const editCategoryObj = createEditCategory(mainEl);

  const allSectionsUnmount = () => {
    [categoryObj, editCategoryObj].forEach((el) => el.unmount());
  };

  const renderIndex = async (e) => {
    e?.preventDefault();
    allSectionsUnmount();
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
    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener("click", renderIndex);
  headerObj.headerBtn.addEventListener("click", () => {
    allSectionsUnmount();
    headerObj.updateHeaderTitle("Новая категория");
    editCategoryObj.mount();
  });
};

initApp();
