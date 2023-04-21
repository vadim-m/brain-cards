import { createElement } from "../js/helpers/createElement.js";

export const showAlert = (text, time = 2000) => {
  const alertBlock = createElement("div", {
    className: "alert",
  });

  const alertText = createElement("p", {
    className: "alert__text",
    textContent: text,
  });

  alertBlock.append(alertText);
  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.classList.add("alert_show");
  });

  setTimeout(() => {
    alertBlock.classList.remove("alert_show");
    setTimeout(() => {
      alertBlock.remove();
    }, 200);
  }, time);
};
