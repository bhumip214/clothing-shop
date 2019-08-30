import React from "react";
import { NavLink } from "react-router-dom";

export function Sort(props) {
  return (
    <div className="sort-btns">
      <NavLink to={`?page=1&sort=skuLowPrice`}>
        <button
          className="sort-btn"
          onClick={() => props.handleSort("skuLowPrice")}
        >
          Lowest to Highest Price
        </button>
      </NavLink>
      <NavLink to={`?page=1&sort=skuHighPrice`}>
        <button
          className="sort-btn"
          onClick={() => props.handleSort("skuHighPrice")}
        >
          Highest to Lowest Price
        </button>
      </NavLink>
      <NavLink to={`?page=1&sort=startDate`}>
        <button
          className="sort-btn"
          onClick={() => props.handleSort("startDate")}
        >
          New Arrivals
        </button>
      </NavLink>
    </div>
  );
}
