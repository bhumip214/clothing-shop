import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export class Product extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchProductById(id);
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (id !== prevProps.match.params.id) {
      this.props.fetchProductById(id);
    }
  }

  render() {
    const id = this.props.match.params.id;
    let productInfo = this.props.productRequests[id];

    if (!productInfo || productInfo.isLoading) {
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

    if (productInfo.error) {
      return <div>Error occurred fetching product</div>;
    }

    let product = productInfo.data;

    return (
      <div className="product">
        <div className="product-info">
          <img
            className="product-img"
            src={product.productImage}
            alt={product.name}
          />
          <div className="product-detail">
            <h3>{product.name.toUpperCase()}</h3>

            <p>Product ID: {product.productId}</p>
            <p>Description: {product.productDescription}</p>
            <p>Price: {product.listPrice}</p>

            <button
              className="dark-btn"
              onClick={() => {
                this.props.handleAddToCart(product.productId);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div>
          <h2>Related Products</h2>
          <ul className="related-products">
            {product.relatedProducts.slice(0, 5).map(relatedProduct => {
              return (
                <li
                  key={relatedProduct.productId}
                  className="related-product-overview"
                >
                  <Link className="link" to={`/product/${Product.productId}`}>
                    <img
                      className="related-product-img"
                      src={relatedProduct.productImage}
                      alt={relatedProduct.name}
                    />

                    <p className="related-product-overview-detail">
                      {relatedProduct.name.toUpperCase()}{" "}
                    </p>
                  </Link>
                  <p className="related-product-overview-detail">
                    {relatedProduct.listPrice}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
