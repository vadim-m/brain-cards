import { createCategory } from "../components/createCategory.js";
import { createEditCategory } from "../components/createEditCategory.js";
import { createHeader } from "../components/createHeader.js";
import { createPairs } from "../components/createPairs.js";
import { createElement } from "./helpers/createElement.js";
import { fetchCard, fetchCategories } from "./service/service.js";

const initApp = async () => {
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector("#app");

  const headerObj = createHeader(headerEl);
  const categoryObj = createCategory(mainEl);
  const editCategoryObj = createEditCategory(mainEl);
  const pairsObj = createPairs(mainEl);

  const allSectionsUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach((el) => el.unmount());
  };

  const postHandler = () => {
    const data = editCategoryObj.parseData();
  };

  const patchHandler = () => {
    const data = editCategoryObj.parseData();
    console.log(data);
  };

  const renderIndex = async (e) => {
    e?.preventDefault();
    allSectionsUnmount();
    const categories = await fetchCategories();
    headerObj.updateHeaderTitle("Категории");
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
    editCategoryObj.btnSave.addEventListener("click", postHandler);
    editCategoryObj.btnSave.removeEventListener("click", patchHandler);
  });

  categoryObj.categoryList.addEventListener("click", async ({ target }) => {
    const categoryItem = target.closest(".category__item");

    if (!categoryItem) {
      return;
    }

    if (target.closest(".category__edit")) {
      const dataCards = await fetchCard(categoryItem.dataset.id);
      allSectionsUnmount();
      headerObj.updateHeaderTitle("Редактирование");
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener("click", patchHandler);
      editCategoryObj.btnSave.removeEventListener("click", postHandler);

      return;
    }

    if (target.closest(".category__del")) {
      console.log("del");
      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCard(categoryItem.dataset.id);
      allSectionsUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.btnReturn.addEventListener("click", renderIndex);
};

initApp();
