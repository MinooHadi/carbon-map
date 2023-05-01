import React from "react";
import logo from "./../../../assets/logo/CCLogo-Black.png";
import { UserAlt } from "../../icons";

function Header() {
  return (
    <div className="flex justify-between items-center py-2 px-4 h-[10vh]">
      <div className="flex items-center">
        <img src={logo} className="w-12" />
        <h1 className="text-2xl font-bold">
          <span className="text-emerald-500">C-Carbon</span> Map
        </h1>
      </div>
      <div className="bg-gray-100 rounded-md w-fit h-fit p-3">
        <UserAlt size="1.2rem" />
      </div>
    </div>
  );
}

export default Header;
