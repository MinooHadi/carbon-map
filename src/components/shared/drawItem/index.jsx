import React from "react";
import { Trash2 } from "../../icons";

function DrawItem(props) {
  return <div className="flex justify-between items-center hover:bg-gray-300 p-4 rounded-md">
    <p className="font-semibold"> {props.title} </p>
    <Trash2 data-id={props.dataId} onClick={props.onClick} />
  </div>;
}

export default DrawItem;
