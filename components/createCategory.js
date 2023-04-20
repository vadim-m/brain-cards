import { createElement } from "../js/helpers/createElement.js";

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
      textContent: data.title,
    });
    item.dataset.id = data.id;

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

  return { mount, unmount };
};
