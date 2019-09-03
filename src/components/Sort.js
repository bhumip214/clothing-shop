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

  const color = props.color.map(color => {
    return colorOptions.find(option => {
      return color === option.value;
    });
  });

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
        isMulti
        options={colorOptions}
        onChange={(colorOption, action) => {
          if (colorOption) {
            const colors = colorOption.map(color => {
              return color.value;
            });
            props.handleColor(colors);
          } else {
            props.handleColor([]);
          }
        }}
      />
    </div>
  );
}
