import React from "react";
import flag from "./../../../assets/image/download.png";
import { BASE_URL } from "../../../api";

function ProjectCart(props) {
  return (
    <div
      className="w-[32%] h-[400px] bg-white rounded-xl shadow-lg"
      data-id={props.id}
      onClick={props.onClick}
    >
      <div className="w-[100%] h-[60%]">
        <img
          src={`${BASE_URL}/${props.thumbnail}`}
          className="w-[100%] h-[100%] object-scale-cover rounded-t-xl"
        />
      </div>
      <div className="h-[40%] relative py-4 px-6 w-[100%] ">
        <h1 className="text-xl font-bold pb-2"> {props.name} </h1>
        <p className="text-sm font-semibold text-gray-700 pb-4 truncate">
          {props.description}
        </p>
        <div className="absolute flex justify-between bottom-3 w-[88%] text-xs font-bold text-gray-400">
          <p> {props.createdAt} </p>
          <div className="flex justify-end items-center gap-2">
            <img src={flag} className="w-6 h-fit" />
            <p>Germany</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCart;
