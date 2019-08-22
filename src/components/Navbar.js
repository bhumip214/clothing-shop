import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export function Navbar(props) {
  return (
    <div className="navbar">
      <NavLink to="/" className="title">
        Clothing Shop
      </NavLink>
      <NavLink
        to="/cart"
        className="shopping-cart-link"
        onClick={props.handleCartClick}
      >
        <img
          className="shopping-cart"
          src="https://img.icons8.com/ios-filled/30/000000/shopping-cart.png"
        />
        <h3 className="cart-item-count">{props.count}</h3>
      </NavLink>
    </div>
  );
}
