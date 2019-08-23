import React from "react";

export function Sort(props) {
  return (
    <div className="sort-btns">
      <button className="sort-btn" onClick={props.handleLTHSort}>
        Lowest to Highest
      </button>
      <button className="sort-btn" onClick={props.handleHTLSort}>
        Highest to Lowest{" "}
      </button>
    </div>
  );
}
