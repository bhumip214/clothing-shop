import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
export function Pagination(props) {
  let paginationBtns = [<button className="page-btn"> {"<"} </button>];
  for (let i = 1; i <= props.totalPages; i++) {
    paginationBtns.push(
      <NavLink to={`?page=${i}&sort=${props.sort}`}>
        <button
          key={i}
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
  paginationBtns.push(<button className="page-btn"> {">"} </button>);
  return paginationBtns;
}
