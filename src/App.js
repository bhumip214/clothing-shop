import React from "react";
import { Route, withRouter } from "react-router-dom";
import queryString from "query-string";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Product } from "./components/Product";
import { fetchProducts, fetchProduct } from "./components/helper";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    const params = queryString.parse(props.location.search);

    this.state = {
      loading: true,
      products: [],
      productRequests: {},
      cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
      totalPages: 1,
      currPage: params.page ? Number(params.page) : 1,
      sort: params.sort ? params.sort : "relevance",
      colorOptions: [],
      color: params.color ? params.color.split(",") : [],
      sizeOptions: [],
      size: params.size ? params.size.split(",") : []
    };
  }

  componentDidMount() {
    this.performFetchProducts(
      this.state.currPage,
      this.state.sort,
      this.state.color,
      this.state.size,
      false
    ).then(facets => {
      // only update size and color initially so user can see all possible options
      const colors = facets.find(facet => {
        return facet.facetId === "color_uFilter";
      });
      const sizes = facets.find(facet => {
        return facet.facetId === "size_uFilter";
      });

      this.setState({
        colorOptions: colors.values,
        sizeOptions: sizes.values
      });
    });
  }

  getQueryString = (page, sort, color, size) => {
    if (color.length !== 0 && size.length !== 0) {
      return `?page=${page}&sort=${sort}&color=${color}&size=${size}`;
    } else if (color.length !== 0) {
      return `?page=${page}&sort=${sort}&color=${color}`;
    } else if (size.length !== 0) {
      return `?page=${page}&sort=${sort}&size=${size}`;
    } else {
      return `?page=${page}&sort=${sort}`;
    }
  };

  performFetchProducts = (page, sort, color, size, updateHistory = true) => {
    this.setState({
      currPage: page,
      sort: sort,
      color: color,
      size: size
    });

    const promise = fetchProducts(page, sort, color, size)
      .then(data => {
        this.setState({
          loading: false,
          products: data.products.products,
          totalPages: Math.ceil(
            data.products.totalProductCount / data.products.pageSize
          )
        });

        return data.facets.facets;
      })

      .catch(error => {
        console.log(error);
      });

    if (updateHistory) {
      const query = this.getQueryString(page, sort, color, size);
      this.props.history.push(query);
    }

    return promise;
  };

  handleGoToPage = page => {
    this.performFetchProducts(
      page,
      this.state.sort,
      this.state.color,
      this.state.size
    );
  };

  handleSort = sort => {
    this.performFetchProducts(1, sort, this.state.color, this.state.size);
  };

  handleColor = color => {
    this.performFetchProducts(1, this.state.sort, color, this.state.size);
  };

  handleSize = size => {
    this.performFetchProducts(1, this.state.sort, this.state.color, size);
  };

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
      this.setState(state => {
        return {
          productRequests: {
            // spread old requests so we dont blow away our cache
            ...state.productRequests,
            [id]: {
              isLoading: false,
              error: null,
              data: data
            }
          }
        };
      });
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

  render() {
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
              loading={this.state.loading}
              products={this.state.products}
              currPage={this.state.currPage}
              totalPages={this.state.totalPages}
              sort={this.state.sort}
              colorOptions={this.state.colorOptions}
              color={this.state.color}
              sizeOptions={this.state.sizeOptions}
              size={this.state.size}
              handleSort={this.handleSort}
              handleColor={this.handleColor}
              handleSize={this.handleSize}
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
              fetchProductById={this.fetchProductById}
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

export default withRouter(App);
