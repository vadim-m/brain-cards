import { createElement } from "../js/helpers/createElement.js";
import { declOfNum } from "../js/helpers/declOfNum.js";

export const createCategory = (app) => {
  const category = createElement("section", {
    className: "category section-offset",
  });

  const container = createElement("div", {
    className: "container",
  });
  category.append(container);

  const categoryList = createElement("ul", {
    className: "category__list",
  });
  container.append(categoryList);

  const createCategoryItem = (data) => {
    const item = createElement("li", {
      className: "category__item",
    });

    item.dataset.id = data.id;

    const btnCard = createElement("button", {
      className: "category__card",
    });

    const titleText = createElement("span", {
      className: "category__title",
      textContent: data.title,
    });

    const countPairs = createElement("span", {
      className: "category__pairs",
      textContent: declOfNum(data.length, ["пара", "пары", "пар"]),
    });

    btnCard.append(titleText, countPairs);

    const btnEdit = createElement("button", {
      className: "category__btn category__edit",
      ariaLabel: "редактировать",
    });

    const btnDel = createElement("button", {
      className: "category__btn category__del",
      ariaLabel: "удалить",
    });

    item.append(btnCard, btnEdit, btnDel);

    return item;
  };

  const mount = (data) => {
    categoryList.textContent = "";
    app.append(category);
    const cards = data.map(createCategoryItem);
    categoryList.append(...cards);
  };

  const unmount = () => {
    category.remove();
  };

  return { mount, unmount, categoryList };
};
