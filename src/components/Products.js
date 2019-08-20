import React from "react";
import "./Products.css";

export function Products(props) {
  return (
    <div>
      <ul className="products">
        {props.products.map(product => {
          return (
            <li key={product.uniqueId} className="product">
              <img src={product.productImage} />
              <p className="product-detail">{product.name.toUpperCase()}</p>
              <p className="product-detail">{product.listPrice}</p>
              <button className="dark-btn" onClick={props.handleAddToCart}>
                Add to Cart
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
