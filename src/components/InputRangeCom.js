import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const InputRangeCom = ({ value, setValue }) => {
  return (
    <div id="input-range">
      <InputRange
        maxValue={10}
        minValue={0}
        value={value.value}
        onChange={(e) => {
          setValue({ value: e });
          console.log(value);
        }}
      />
    </div>
  );
};

export default InputRangeCom;
