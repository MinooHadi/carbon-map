import React from "react";

function Button(props) {
  return <button className={props.className}> {props.title} </button>;
}

export default Button;
