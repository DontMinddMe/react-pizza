export const getItems = () => {
  const data = window.localStorage.getItem('cart');

  return data ? JSON.parse(data) : [];
};
