import React from "react";
import "./Cart.css";

export function Cart(props) {
  const filteredCart = props.cart.filter(c => {
    return c !== "";
  });

  let foundItems = [];
  if (props.products.length !== 0) {
    foundItems = filteredCart.map(itemId => {
      return props.products.find(product => {
        return product.uniqueId === itemId;
      });
    });
  }

  return (
    <div className="cart">
      <div className="cart-title">
        <h3>Cart</h3>
        <span>({props.count} items)</span>
      </div>
      <div className="cart-table">
        <p>Item</p>
        <p>Qty</p>
        <p>Price</p>
      </div>

      <div>
        <ul className="cart-items">
          {foundItems.map(item => {
            return (
              <li key={item.uniqueId} className="cart-item">
                <div className="item-img-name">
                  <img
                    className="cart-img"
                    src={item.productImage}
                    alt={item.name}
                  />
                  <p className="product-overview-detail">
                    {item.name.toUpperCase()}
                  </p>
                </div>
                <p className="product-overview-detail">{item.listPrice}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
