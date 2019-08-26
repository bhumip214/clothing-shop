import React from "react";

export function fetchProducts(page) {
  return fetch(`http://localhost:8001/api/express/whatshot?page=${page}`).then(
    res => res.json()
  );
}
