import React from "react";
import { Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Product } from "./components/Product";
import { fetchProducts, fetchProduct } from "./components/helper";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      productRequests: localStorage.getItem("productRequests")
        ? JSON.parse(localStorage.getItem("productRequests"))
        : {},
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
      totalPages: 1,
      currPage: 1
    };
  }

  componentDidMount() {
    fetchProducts(this.state.currPage)
      .then(data => {
        this.setState({
          products: data.products.products,
          totalPages: Math.ceil(
            data.products.totalProductCount / data.products.pageSize
          )
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Fetch product via API if we don't have the product in our cache.
   */
  fetchProductById = id => {
    if (this.state.productRequests[id]) {
      console.log("We already have this thing. Not gonna fetch man");
      return;
    }

    this.setState({
      productRequests: {
        // spread old requests so we dont blow away our cache
        ...this.state.productRequests,
        [id]: {
          isLoading: true,
          error: null,
          data: null
        }
      }
    });

    fetchProduct(id).then(data => {
      this.setState(
        state => {
          return {
            productRequests: {
              // spread old requests so we dont blow away our cache
              ...state.productRequests,
              [id]: {
                isLoading: false,
                error: null,
                data
              }
            }
          };
        },
        () =>
          localStorage.setItem(
            "productRequests",
            JSON.stringify(this.state.productRequests)
          )
      );
    });
  };

  handleAddToCart = id => {
    this.setState(
      state => {
        const itemFound = state.cart.find(cartItem => {
          return cartItem.id === id;
        });
        if (!itemFound) {
          return {
            cart: [...state.cart, { id: id, qty: 1 }]
          };
        } else {
          const updatedItem = state.cart.map(cartItem => {
            if (cartItem.id === id) {
              return { ...cartItem, qty: cartItem.qty + 1 };
            } else {
              return cartItem;
            }
          });
          return {
            cart: updatedItem
          };
        }
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
          cart: cart
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

  handleGoToPage = page => {
    this.setState({
      currPage: page
    });
    fetchProducts(page)
      .then(data => {
        this.setState({
          products: data.products.products
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("pr:", this.state.productRequests);
    console.log(this.state.cart);

    const count = this.state.cart.reduce((acc, cur) => {
      return acc + cur.qty;
    }, 0);

    return (
      <div className="App">
        <Navbar count={count} />

        <Route
          exact
          path="/"
          render={props => (
            <Products
              {...props}
              products={this.state.products}
              handleLTHSort={this.handleLTHSort}
              handleHTLSort={this.handleHTLSort}
              totalPages={this.state.totalPages}
              currPage={this.state.currPage}
              handleGoToPage={this.handleGoToPage}
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
              productRequests={this.state.productRequests}
              count={count}
              handleDeleteFromCart={this.handleDeleteFromCart}
            />
          )}
        />

        <Route
          path="/product/:id"
          render={props => (
            <Product
              {...props}
              fetchProductById={this.fetchProductById}
              productRequests={this.state.productRequests}
              handleAddToCart={this.handleAddToCart}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
