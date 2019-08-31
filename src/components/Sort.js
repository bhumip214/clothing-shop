import React from "react";
import Select from "react-select";

const sortOptions = [
  { value: "relevance", label: "Featured" },
  { value: "skuLowPrice", label: "Low to High Price" },
  { value: "skuHighPrice", label: "High to Low Price" },
  { value: "startDate", label: "New Arrivals" }
];

export function Sort(props) {
  const option = sortOptions.find(option => {
    return props.sort === option.value;
  });

  const colorOptions = props.colorOptions.map(color => {
    return { value: color, label: color };
  });

  const color = colorOptions.find(option => {
    return props.color === option.value;
  });

  console.log(color);

  return (
    <div className="">
      <Select
        value={option}
        name="sort"
        options={sortOptions}
        onChange={(sortOption, action) => {
          props.handleSort(sortOption.value);
        }}
      />
      <Select
        value={color}
        name="color"
        isClearable
        options={colorOptions}
        onChange={(colorOption, action) => {
          console.log(action);
          if (colorOption) {
            props.handleColor(colorOption.value);
          } else {
            props.handleColor("");
          }
        }}
      />
    </div>
  );
}
