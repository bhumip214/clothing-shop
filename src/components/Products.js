import React from "react";
import "./Products.css";
import { Sort } from "./Sort";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export function Products(props) {
  return (
    <div className="products-container">
      <Sort
        currPage={props.currPage}
        sort={props.sort}
        colorOptions={props.colorOptions}
        color={props.color}
        sizeOptions={props.sizeOptions}
        size={props.size}
        handleSort={props.handleSort}
        handleColor={props.handleColor}
        handleSize={props.handleSize}
      />

      {props.loading ? (
        <Loader
          type="Puff"
          color="#333"
          height="100"
          width="100"
          className="loader"
        />
      ) : (
        <>
          <div>
            <Pagination
              totalPages={props.totalPages}
              currPage={props.currPage}
              handleGoToPage={props.handleGoToPage}
              sort={props.sort}
            />
          </div>
          <ul className="products">
            {props.products.map(product => {
              return (
                <li key={product.uniqueId} className="product-overview">
                  <Link
                    to={`/product/${product.uniqueId}`}
                    className="product-overview-detail link"
                  >
                    <img src={product.productImage} alt={product.name} />

                    {product.name.toUpperCase()}
                  </Link>
                  <p className="product-overview-detail">{product.listPrice}</p>
                </li>
              );
            })}
          </ul>
          <div>
            <Pagination
              totalPages={props.totalPages}
              currPage={props.currPage}
              handleGoToPage={props.handleGoToPage}
              sort={props.sort}
            />
          </div>
        </>
      )}
    </div>
  );
}
