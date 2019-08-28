import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

export function Cart(props) {
  let foundItems = [];

  if (props.productRequests) {
    foundItems = props.cart.map(cartItem => {
      return props.productRequests[cartItem.id].data;
    });
  }
  console.log("found", foundItems);

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
          {foundItems.map((item, index) => {
            return (
              <li key={item.productId} className="cart-table item">
                <div className="item-img-name">
                  <img
                    className="cart-img"
                    src={item.productImage}
                    alt={item.name}
                  />
                  <div>
                    <Link
                      to={`/product/${item.productId}`}
                      className="product-overview-detail link"
                    >
                      <p>{item.name.toUpperCase()}</p>
                    </Link>
                    <button
                      onClick={() => props.handleDeleteFromCart(item.uniqueId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="product-overview-detail">
                  {props.cart[index].qty}
                </p>
                <p className="product-overview-detail">{item.listPrice}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
