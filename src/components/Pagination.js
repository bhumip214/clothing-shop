import React from "react";
import classnames from "classnames";

export function Pagination(props) {
  let paginationBtns = [<button className="page-btn"> {"<"} </button>];
  console.log(props.pages);
  for (let i = 1; i <= props.pages; i++) {
    paginationBtns.push(
      <button
        key={i}
        className={classnames("page-btn", {
          active: props.currPage === i
        })}
      >
        {i}
      </button>
    );
  }
  paginationBtns.push(<button className="page-btn"> {">"} </button>);
  console.log(paginationBtns);
  return paginationBtns;
}
