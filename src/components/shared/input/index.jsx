import React from "react";

function Input(props) {
  return (
    <div
      className="flex flex-col w-[100%]"
    >
      {
        props.lable && <label className="text-sm font-medium text-gray-500 mb-1">
          {props.lable}
      </label>
      }
      
      {
        props.type === 'submit' ?
          <input
            className={props.className}
            type={props.type}
            name={props.name}
            value={props.value}
            disabled={props.disabled}
          /> :
          <input
            className={props.className}
            type={props.type}
            placeholder={props.placeholder}
            name={props.name}
            onChange={props.onChange}
            required={!!props.required}
          />
      }
    </div>
  );
}

export default Input;
