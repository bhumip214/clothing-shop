import React from "react";
import classnames from "classnames";

export function Pagination(props) {
  let paginationBtns = [<button className="page-btn"> {"<"} </button>];
  for (let i = 1; i <= props.totalPages; i++) {
    paginationBtns.push(
      <button
        key={i}
        className={classnames("page-btn", {
          active: props.currPage === i
        })}
        onClick={() => props.handleGoToPage(i)}
      >
        {i}
      </button>
    );
  }
  paginationBtns.push(<button className="page-btn"> {">"} </button>);
  return paginationBtns;
}
