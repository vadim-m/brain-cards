import { showAlert } from "../components/createAlert.js";
import { createCategory } from "../components/createCategory.js";
import { createEditCategory } from "../components/createEditCategory.js";
import { createHeader } from "../components/createHeader.js";
import { createPairs } from "../components/createPairs.js";
import { createElement } from "./helpers/createElement.js";
import {
  fetchCard,
  fetchCategories,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchEditCategory,
} from "./service/service.js";

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

  const postHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data);

    if (dataCategories.error) {
      showAlert(dataCategory.error?.message);
      return;
    }

    showAlert(`Новая категория - ${data.title} добавлена!`);
    allSectionsUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategories);
  };

  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(
      editCategoryObj.btnSave.dataset.id,
      data
    );

    if (dataCategories.error) {
      showAlert(dataCategory.error?.message);
      return;
    }

    showAlert(`Категория ${data.title} обновлена!`);
    allSectionsUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategories);
  };

  const cancelHandler = async () => {
    if (confirm("Вы уверены, что хотите выйти без сохранения категории?")) {
      await renderIndex();
    }
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
      editCategoryObj.btnCancel.addEventListener("click", cancelHandler);

      return;
    }

    if (target.closest(".category__del")) {
      if (confirm("Вы уверены, что хотите удалить категорию?")) {
        const result = fetchDeleteCategory(categoryItem.dataset.id);

        if (result.error) {
          showAlert(result.error.message);
        }

        showAlert("Категория удалена");
        categoryItem.remove();
      }
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
