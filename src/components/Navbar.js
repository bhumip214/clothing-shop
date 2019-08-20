import React from "react";
import "./Navbar.css";
export function Navbar(props) {
  return (
    <div className="navbar">
      <h2 className="title"> Clothing Shop</h2>
      <button className="shopping-cart-btn">
        <img
          className="shopping-cart"
          src="https://img.icons8.com/ios-filled/30/000000/shopping-cart.png"
        />
        <h3 className="cart-item-count">{props.count}</h3>
      </button>
    </div>
  );
}
