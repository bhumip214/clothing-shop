import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
export function Pagination(props) {
  let paginationBtns = [];
  for (let i = 1; i <= props.totalPages; i++) {
    paginationBtns.push(
      <NavLink key={i} to={`?page=${i}&sort=${props.sort}`}>
        <button
          className={classnames("page-btn", {
            active: props.currPage === i
          })}
          onClick={() => props.handleGoToPage(i)}
        >
          {i}
        </button>
      </NavLink>
    );
  }

  return paginationBtns;
}
