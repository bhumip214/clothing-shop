import React from "react";
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

  React.useEffect(() => {
    console.log("--------Calling effect----------");
    props.fetchProductById(id);
  }, [id]);

  let productInfo = props.productRequests[id];

  console.log({ productInfo });

  if (!productInfo || productInfo.isLoading) {
    return <div>Loading...</div>;
  }

  if (productInfo.error) {
    return <div>Error occurred fetching product</div>;
  }

  let product = productInfo.data;

  return (
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
  );
}
