import { createElement } from "../js/helpers/createElement.js";
import { showAlert } from "./createAlert.js";

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

  const cardController = (data) => {
    let index = 0;

    cardFront.textContent = data[index][0];
    cardBack.textContent = data[index][1];

    const flipCard = () => {
      btnCard.classList.add("card__item_flipped");
      btnCard.removeEventListener("click", flipCard);

      setTimeout(() => {
        btnCard.classList.remove("card__item_flipped");

        setTimeout(() => {
          index++;

          if (index === data.length) {
            cardFront.textContent = "Все слова пройдены";
            showAlert("Возврат к категориям");

            setTimeout(() => {
              btnReturn.click();
            }, 1500);
            return;
          }

          cardFront.textContent = data[index][0];
          cardBack.textContent = data[index][1];
          setTimeout(() => {
            btnCard.addEventListener("click", flipCard);
          }, 300);
        }, 100);
      }, 1200);
    };

    btnCard.addEventListener("click", flipCard);
  };

  const mount = (data) => {
    app.append(pairs);
    cardController(data.pairs);
  };

  const unmount = (data) => {
    pairs.remove();
  };

  return { btnReturn, mount, unmount };
};
