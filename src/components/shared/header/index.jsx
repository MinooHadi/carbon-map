import React, { useState } from "react";
import logo from "./../../../assets/logo/CCLogo-Black.png";
import { Menu } from "../../icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../api";

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  function logOut() {
    fetch(`${BASE_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        navigate("/");
      } else {
        alert("try later");
      }
    });
  }

  return (
    <div className="flex justify-between items-center py-2 px-4 h-[10vh]">
      <div className="flex items-center">
        <img src={logo} className="w-12" />
        <h1 className="text-2xl font-bold">
          <span className="text-emerald-500">C-Carbon</span> Map
        </h1>
      </div>
      <div className="flex items-center w-[50%] justify-end gap-24">
        <p
          className="font-semibold text-lg hover:cursor-pointer hover:text-slate-400"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <p
          className="font-semibold text-lg hover:cursor-pointer hover:text-slate-400"
          onClick={() => navigate("/projects")}
        >
          Projects
        </p>
        <div
          className="bg-gray-100 rounded-md w-fit h-fit p-3"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Menu size="1.2rem" />
        </div>
        {showMenu && (
          <div className="absolute top-[8.5vh] right-4 w-32 bg-white h-fit border-2 flex flex-col border-gray-300 rounded-md p-2">
            <p className="hover:cursor-pointer font-semibold hover:bg-slate-200 p-1">Profile</p>
            <p className="hover:cursor-pointer font-semibold hover:bg-slate-200 p-1">Settings</p>
            <p className="hover:cursor-pointer font-semibold hover:bg-slate-200 p-1" onClick={logOut}>
              Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
