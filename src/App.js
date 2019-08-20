import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      count: 0
    };
  }

  componentDidMount() {
    fetch("http://localhost:8001/api/express/whatshot")
      .then(res => res.json())
      .then(data => {
        console.log(data.products.products);
        this.setState({ products: data.products.products });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleAddToCart = e => {
    e.preventDefault();
    this.setState(({ count }) => ({
      count: count + 1
    }));
  };

  render() {
    return (
      <div className="App">
        <Navbar count={this.state.count} />
        <Products
          products={this.state.products}
          handleAddToCart={this.handleAddToCart}
        />
      </div>
    );
  }
}

export default App;
