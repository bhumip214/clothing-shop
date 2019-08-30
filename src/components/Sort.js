import React from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "skuLowPrice", label: "Low to High Price" },
  { value: "skuHighPrice", label: "High to Low Price" },
  { value: "startDate", label: "New Arrivals" }
];

export function Sort(props) {
  const option = sortOptions.find(option => {
    return props.sort === option.value;
  });

  return (
    <div className="">
      <Select
        defaultValue={option}
        name="sort"
        options={sortOptions}
        onChange={(sortOption, action) => {
          console.log(sortOption, action);
          props.handleSort(sortOption.value);
        }}
      />
    </div>
  );
}
