import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Product } from "./components/Product";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8001/api/express/whatshot")
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data.products.products });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddToCart = id => {
    this.setState(
      state => {
        return {
          cart: [...state.cart, { id: id, qty: 1 }],
          count: this.state.cart.length + 1
        };
      },
      () => localStorage.setItem("cart", JSON.stringify(this.state.cart))
    );
  };

  handleDeleteFromCart = id => {
    this.setState(
      state => {
        const cart = state.cart.filter(cartItem => {
          return cartItem.id !== id;
        });
        return {
          cart: cart,
          count: cart.length
        };
      },
      () => localStorage.setItem("cart", JSON.stringify(this.state.cart))
    );
  };
  handleLTHSort = () => {
    const sortedProducts = this.state.products.sort((a, b) => {
      return a.listPrice.slice(1) - b.listPrice.slice(1);
    });
    this.setState({ products: sortedProducts });
  };

  handleHTLSort = () => {
    const sortedProducts = this.state.products.sort((a, b) => {
      return b.listPrice.slice(1) - a.listPrice.slice(1);
    });
    this.setState({ products: sortedProducts });
  };

  render() {
    return (
      <div className="App">
        <Navbar cart={this.state.cart} />

        <Route
          exact
          path="/"
          render={props => (
            <Products
              {...props}
              products={this.state.products}
              handleLTHSort={this.handleLTHSort}
              handleHTLSort={this.handleHTLSort}
            />
          )}
        />

        <Route
          exact
          path="/cart"
          render={props => (
            <Cart
              {...props}
              cart={this.state.cart}
              products={this.state.products}
              handleDeleteFromCart={this.handleDeleteFromCart}
            />
          )}
        />

        <Route
          path="/product/:id"
          render={props => (
            <Product
              {...props}
              products={this.state.products}
              handleAddToCart={this.handleAddToCart}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
