import React from "react";

function Input(props) {
  return (
    <div className={!props.type === "date" ? "flex flex-col w-[100%]" : "flex flex-row items-center gap-2 w-1/4"}>
      <label className="text-sm font-medium text-gray-500 mb-1">
        {props.lable}
      </label>
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Input;
