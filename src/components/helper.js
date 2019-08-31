export function fetchProducts(page, sort, color) {
  return fetch(
    `http://localhost:8001/api/express/whatshot?page=${page}&sort=${sort}&color=${color}`
  ).then(res => res.json());
}

export function fetchProduct(id) {
  return fetch(`http://localhost:8001/api/express/product/${id}`).then(res =>
    res.json()
  );
}
