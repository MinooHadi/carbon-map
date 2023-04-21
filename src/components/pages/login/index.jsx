import React from "react";
import { Button, Input } from "../../shared";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, UserAlt } from "../../icons";
import logo from "./../../../assets/logo/CCLogo-Black.png";

function Login() {
  const navigate = useNavigate()

  return (
    <div className="bg-emerald-50 h-[100vh] pt-[10vh]">
      <div className="bg-gray-50 h-[80vh] w-[90%] m-auto flex justify-between px-64 pt-20 gap-8 shadow-md">
        <div className="w-[60%] py-3 ">
          <div className="flex items-center">
            <img src={logo} className="w-12" />
            <h1 className="text-3xl font-bold"> <span className="text-emerald-500">Carbon</span> Map</h1>
          </div>
          <p className="text-gray-500 font-semibold text-2xl pt-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            atque fuga voluptatum necessitatibus natus officiis hic, praesentium
            commodi eos!
          </p>
        </div>
        <hr className="w-[2px] h-64 bg-gray-200" />
        <div className="flex flex-col gap-3 w-[40%] py-3 ">
          <div className="relative flex items-center w-[100%] ">
            <UserAlt className="absolute left-2" />
            <Input
              type="text"
              placeholder="Username"
              className="bg-gray-200 py-1 pl-8 rounded-md"
            />
          </div>
          <div className="relative flex items-center w-[100%]">
            <Lock className="absolute left-2" />
            <Input
              type="password"
              placeholder="Password"
              className="bg-gray-200 py-1 pl-8 w-[100%] rounded-md"
            />
          </div>
          <div className="flex items-center pt-3 justify-between">
            <Link to="#" className="text-emerald-500 text-sm font-semibold">
              Forget password?
            </Link>
            <Button
              className="bg-emerald-400 text-white font-semibold py-1 px-2 rounded-md flex items-center gap-1"
              title="Sign In"
              icon={<ArrowRight color="white" size="1.2rem" />}
              onClick={() => navigate("/projects")}
            />
          </div>
          <hr className="h-[1.5px] w-[100%] bg-gray-200 my-3" />
          <div className="flex items-center w-[100%] justify-center gap-2">
            <p className="text-gray-500 text-xs font-semibold">No account yet?</p>
            <Link to="#" className="text-emerald-500 text-sm font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
