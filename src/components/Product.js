import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/*
class ProductClassSolution extends React.Component {
  componentDidMount() {
    this.props.fetchProductById(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.fetchProductById(this.props.match.params.id);
    }
  }

  render() {
    return <div className="product"></div>;
  }
}
*/

export function Product(props) {
  const id = props.match.params.id;
  const { fetchProductById } = props;

  React.useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  let productInfo = props.productRequests[id];

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
    <div>
      <div className="product">
        <img src={product.productImage} alt={product.name} />
        <div className="product-detail">
          <h3>{product.name.toUpperCase()}</h3>

          <p>Product ID: {product.productId}</p>
          <p>Description: {product.productDescription}</p>
          <p>Price: {product.listPrice}</p>
          <button
            className="dark-btn"
            onClick={() => {
              props.handleAddToCart(product.productId);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ul className="products">
        {product.relatedProducts.map(relatedProduct => {
          return (
            <li key={relatedProduct.productId} className="product-overview">
              <Link
                to={`/product/${relatedProduct.productId}`}
                className="product-overview-detail link"
              >
                <img
                  src={relatedProduct.productImage}
                  alt={relatedProduct.name}
                />

                {relatedProduct.name.toUpperCase()}
              </Link>
              <p className="product-overview-detail">
                {relatedProduct.listPrice}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
