import React from "react";
import { Input } from "../../shared";
import { Link } from "react-router-dom";
import { Lock, UserAlt } from "../../icons";

function Login() {
  return (
    <div className="bg-emerald-50 h-[100vh]">
      <div className="bg-white w-[60%] m-auto flex justify-between p-14 gap-8">
        <div className="w-[60%] py-3 ">
          <h1>Lorem</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            atque fuga voluptatum necessitatibus natus officiis hic, praesentium
            commodi eos!
          </p>
        </div>
        <hr className="w-[2px] h-64 bg-gray-200" />
        <div className="flex flex-col gap-3 w-[40%] py-3 ">
          <div className="relative flex items-center">
            <UserAlt className="absolute left-2" />
            <Input
              type="text"
              placeholder="Username"
              className="bg-gray-100 py-1 pl-8 rounded-md"
            />
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-2" />
            <Input
              type="password"
              placeholder="Password"
              className="bg-gray-100 py-1 pl-8 rounded-md"
            />
          </div>
          <Link to="#" className="text-emerald-500 pt-5 text-sm font-semibold">
            Forget password?
          </Link>
          <hr className="h-[1.5px] w-52 bg-gray-200 my-3" />
          <div className="flex items-center gap-2 pl-7">
            <p className="text-gray-400 text-sm">No account yet?</p>
            <Link
              to="#"
              className="text-emerald-500 text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
