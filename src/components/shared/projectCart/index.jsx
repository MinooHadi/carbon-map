import React from "react";
import flag from "./../../../assets/image/download.png";

function ProjectCart(props) {
  return (
    <div className="w-[32%] bg-white rounded-xl shadow-lg" data-id={props.id} onClick={props.onClick} >
      <img src={`http://192.168.1.102:5000/${props.thumbnail}`} className="w-full h-[60%] object-scale-cover rounded-t-xl" />
      <div className="py-4 px-6">
        <h1 className="text-xl font-bold pb-2"> {props.name} </h1>
        <p className="text-sm font-semibold text-gray-700 pb-4 truncate">
          {props.description}
        </p>
        <div className="flex justify-between text-xs font-bold text-gray-400">
          <p> {props.createdAt} </p>
          <div className="flex items-center gap-2">
            <img src={flag} className="w-6 h-fit" />
            <p>Germany</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCart;
