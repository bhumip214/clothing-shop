import queryString from "query-string";

export function fetchProducts(page, sort, color, size) {
  const c = queryString.stringify({ color: color });
  const s = queryString.stringify({ size: size });
  return fetch(
    `http://localhost:8001/api/express/whatshot?page=${page}&sort=${sort}&${c}&${s}`
  ).then(res => res.json());
}

export function fetchProduct(id) {
  return fetch(`http://localhost:8001/api/express/product/${id}`).then(res =>
    res.json()
  );
}
