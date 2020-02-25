import React from "react";

export default function Display(props) {
  const displayValue = props.displayValue;

  return (
    <div id="displayWrapper">
      <input
        id="displayValue"
        type="text"
        value={displayValue}
        readOnly
      />
    </div>
  );
}
