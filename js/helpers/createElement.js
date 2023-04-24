export const createElement = (tag, attr) => {
  const el = document.createElement(tag);
  Object.assign(el, attr);

  return el;
};
