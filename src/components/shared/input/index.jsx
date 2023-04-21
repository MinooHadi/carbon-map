import React from "react";

function Input(props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-500 mb-1"> {props.lable} </label>
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
