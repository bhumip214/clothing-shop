import React from "react";
import "./Products.css";
import { Sort } from "./Sort";

export function Products(props) {
  return (
    <div className="products-container">
      <Sort
        handleLTHSort={props.handleLTHSort}
        handleHTLSort={props.handleHTLSort}
      />
      <ul className="products">
        {props.products.map(product => {
          return (
            <li key={product.uniqueId} className="product">
              <img src={product.productImage} alt={product.name} />
              <p className="product-detail">{product.name.toUpperCase()}</p>
              <p className="product-detail">{product.listPrice}</p>
              <button
                className="dark-btn"
                onClick={() => {
                  props.handleAddToCart(product.uniqueId);
                }}
              >
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
