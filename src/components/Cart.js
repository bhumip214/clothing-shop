import React from "react";
import PropTypes from "prop-types";
import "./Cart.css";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export function Cart(props) {
  const { cart, fetchProductById } = props;

  React.useEffect(() => {
    cart.forEach(cartItem => {
      fetchProductById(cartItem.id);
    });
  }, [cart, fetchProductById]);

  // isLoading = is any item loading
  let isLoading = false;
  // hasError = does any item have error
  let foundItems = [];
  // foundItems = info.data[]
  let notFoundCount = 0;

  props.cart.forEach(cartItem => {
    let productInfo = props.productRequests[cartItem.id];
    if (productInfo) {
      if (productInfo.data) {
        foundItems.push(productInfo.data);
      } else if (productInfo.isLoading) {
        isLoading = productInfo.isLoading;
      } else if (productInfo.hasError) {
        notFoundCount++;
      }
    } else {
      isLoading = true;
    }
  });

  if (isLoading) {
    return (
      <Loader
        type="Puff"
        color="#333"
        height="100"
        width="100"
        className="loader"
      />
    );
  }

  return (
    <div className="cart">
      <div className="cart-title">
        <h3>Cart</h3>
        <span>({props.count} items)</span>
      </div>
      <div className="cart-table ">
        <p>Item</p>
        <p>Qty</p>
        <p>Price</p>
      </div>

      <div>
        {notFoundCount > 0 ? (
          <h1>{notFoundCount} items is not found!</h1>
        ) : null}
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
                      <p className="cart-item-name">
                        {item.name.toUpperCase()}
                      </p>
                    </Link>
                    <button
                      className="light-btn"
                      onClick={() => props.handleDeleteFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="item-qty">{props.cart[index].qty}</p>
                <p className="item-price">
                  ${item.listPrice.slice(1) * props.cart[index].qty}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cart-table">
        <p>Total</p>
        <p>{props.count}</p>
        <p>
          $
          {foundItems
            .reduce((acc, curr, index) => {
              let price = curr.listPrice.slice(1) * props.cart[index].qty;
              return acc + price;
            }, 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired
    })
  )
};

// const cart = [{ id: "09705125", qty: 1 }, { id: "06978331", qty: 1 }];
// const productRequests = {};

// // [undefined, undefined]
// let foundItems = cart.map(cartItem => {
//   let productInfo = productRequests[cartItem.id]; // undefined
//   if (productInfo) {
//     return productInfo.data;
//   } else {
//     return undefined;
//   }
// });
