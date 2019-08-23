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
      cart: localStorage.getItem("productIdArray")
        ? localStorage.getItem("productIdArray").split(",")
        : [],
      count: localStorage.getItem("productIdArray")
        ? localStorage.getItem("productIdArray").split(",").length
        : 0
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
    this.setState(state => {
      // const { count, cart } = state;
      return {
        count: this.state.cart.length + 1,
        cart: [...state.cart, id]
      };
    });
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
    localStorage.setItem("productIdArray", this.state.cart);

    return (
      <div className="App">
        <Navbar count={this.state.count} />

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
              count={this.state.count}
              cart={this.state.cart}
              products={this.state.products}
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
