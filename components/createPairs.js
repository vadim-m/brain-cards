import { createElement } from "../js/helpers/createElement.js";

export const createPairs = (app) => {
  const pairs = createElement("section", {
    className: "card section-offset",
  });

  const container = createElement("div", {
    className: "container card__container",
  });

  const btnReturn = createElement("button", {
    className: "card__return",
    ariaLabel: "Возврат к категориям",
  });

  const btnCard = createElement("button", {
    className: "card__item",
  });

  const cardFront = createElement("span", {
    className: "card__front",
    textContent: "btn",
  });

  const cardBack = createElement("span", {
    className: "card__back",
    textContent: "btn2",
  });

  btnCard.append(cardFront, cardBack);
  container.append(btnReturn, btnCard);
  pairs.append(container);

  const mount = (data) => {
    app.append(pairs);
  };

  const unmount = (data) => {
    pairs.remove();
  };

  return { btnReturn, mount, unmount };
};
