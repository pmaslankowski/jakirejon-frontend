
const getByValue = (container, value) => {
  return container.querySelector(`[value=${value}]`);
};

export default getByValue;