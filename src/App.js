import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      count: 0,
      cart: []
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
        count: state.count + 1,
        cart: [...state.cart, id]
      };
    });
  };

  render() {
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
              handleAddToCart={this.handleAddToCart}
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
      </div>
    );
  }
}

export default App;
