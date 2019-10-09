import queryString from "query-string";
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8001"
    : "https://clothingshop-bp.herokuapp.com";

export function fetchProducts(page, sort, color, size) {
  const c = queryString.stringify({ color: color });
  const s = queryString.stringify({ size: size });
  return fetch(
    `${baseURL}/api/express/whatshot?page=${page}&sort=${sort}&${c}&${s}`
  ).then(res => res.json());
}

export function fetchProduct(id) {
  return fetch(`${baseURL}/api/express/product/${id}`).then(res => res.json());
}
