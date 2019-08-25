import React from "react";

export function Product(props) {
  let product;
  if (props.products.length !== 0) {
    product = props.products.find(product => {
      return product.uniqueId === props.match.params.id;
    });
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  console.log("p:", props.products, product);
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
            props.handleAddToCart(product.uniqueId);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
