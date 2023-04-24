export const shuffleArr = (arr) => {
  const array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const rndmIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[rndmIndex]] = [array[rndmIndex], array[i]];
  }

  return array;
};
