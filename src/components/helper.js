export function fetchProducts(page) {
  return fetch(`http://localhost:8001/api/express/whatshot?page=${page}`).then(
    res => res.json()
  );
}

export function fetchProduct(id) {
  return fetch(`http://localhost:8001/api/express/product/${id}`).then(res =>
    res.json()
  );
}
