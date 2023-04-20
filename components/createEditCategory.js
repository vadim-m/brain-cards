import { createElement } from "../js/helpers/createElement.js";

const TITLE = "введите название категории";

export const createEditCategory = (app) => {
  const editCategory = createElement("section", {
    className: "edit section-offset",
  });

  const container = createElement("div", {
    className: "container edit__container",
  });

  const title = createElement("h2", {
    className: "edit__title",
    contentEditable: true,
    title: "Можно редактировать",
  });

  const table = createElement("table", {
    className: "edit__table table",
  });

  const thead = createElement("thead");
  const trThead = createElement("tr");
  const tbody = createElement("tbody");

  const tableHeadCellMain = createElement("th", {
    className: "table__cell",
    textContent: "main",
  });
  const tableHeadCellSecond = createElement("th", {
    className: "table__cell",
    textContent: "second",
  });
  const tableHeadCellEmpty = createElement("th", {
    className: "table__cell",
  });

  const btnWrapper = createElement("div", {
    className: "edit__btn-wrapper",
  });

  const btnAddRow = createElement("div", {
    className: "edit__btn edit__add-row",
    textContent: "Добавить пару",
  });

  const btnAddSave = createElement("div", {
    className: "edit__btn edit__save",
    textContent: "Сохранить категорию",
  });

  const btnAddCancel = createElement("div", {
    className: "edit__btn edit__cancel",
    textContent: "Отмена",
  });

  editCategory.append(container);
  table.append(thead, tbody);
  thead.append(trThead);
  trThead.append(tableHeadCellMain, tableHeadCellSecond, tableHeadCellEmpty);
  btnWrapper.append(btnAddRow, btnAddSave, btnAddCancel);
  container.append(title, table, btnWrapper);

  const clearTitle = () => {
    if (title.textContent === TITLE) {
      title.textContent = "";
    }
  };

  const checkTitle = () => {
    if (title.textContent === "") {
      title.textContent = TITLE;
    }
  };

  const createTRCell = (dataArr) => {
    const tr = createElement("tr");

    const tableCellMain = createElement("th", {
      className: "table__cell table__cell_one",
      contentEditable: true,
      textContent: dataArr[0],
    });

    const tableCellSecond = createElement("th", {
      className: "table__cell table__cell_two",
      contentEditable: true,
      textContent: dataArr[1],
    });

    const tableCellDel = createElement("th", {
      className: "table__cell",
    });

    const delRow = createElement("button", {
      className: "table__del",
      textContent: "x",
    });
    delRow.addEventListener("click", () => {
      if (confirm("Вы уверены, что хотите удалить строку?")) {
        tr.remove();
      }
    });

    tableCellDel.append(delRow);

    tr.append(tableCellMain, tableCellSecond, tableCellDel);

    return tr;
  };

  title.addEventListener("focus", clearTitle);
  title.addEventListener("blur", checkTitle);

  btnAddRow.addEventListener("click", () => {
    const emptyRow = createTRCell(["", ""]);
    tbody.append(emptyRow);
  });

  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = "";
    title.textContent = data.title;

    if (title.textContent === TITLE) {
      title.classList.add("edit__title_change");
    } else {
      title.classList.remove("edit__title_change");
    }

    const rows = data.pairs.map(createTRCell);
    const emptyRow = createTRCell(["", ""]);
    tbody.append(...rows, emptyRow);

    app.append(editCategory);
  };

  const unmount = () => {
    editCategory.remove();
  };

  return { mount, unmount };
};
