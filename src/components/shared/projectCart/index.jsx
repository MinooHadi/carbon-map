import React from "react";
import image from "./../../../assets/image/JungleValley-22x32-boreal-preview.webp";
import flag from "./../../../assets/image/download.png";

function ProjectCart() {
  return (
    <div className="w-[32%] bg-white rounded-xl shadow-lg">
      <img src={image} className="w-full h-[60%] object-scale-cover rounded-t-xl" />
      <div className="py-4 px-6">
        <h1 className="text-xl font-bold pb-2">Title</h1>
        <p className="text-sm font-semibold text-gray-700 pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quis
          explicabo esse praesentium quam perferendis inventore voluptatum.
        </p>
        <div className="flex justify-between text-xs font-bold text-gray-400">
          <p>07.06.2021</p>
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
