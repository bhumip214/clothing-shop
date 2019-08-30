export function fetchProducts(page, sort) {
  return fetch(
    `http://localhost:8001/api/express/whatshot?page=${page}&sort=${sort}`
  ).then(res => res.json());
}

export function fetchProduct(id) {
  return fetch(`http://localhost:8001/api/express/product/${id}`).then(res =>
    res.json()
  );
}
