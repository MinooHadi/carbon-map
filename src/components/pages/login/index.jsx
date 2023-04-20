import React from "react";
import { Input } from "../../shared";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-yellow-100 h-[100vh]">
      <div className="bg-white w-[60%] m-auto flex justify-between p-14">
        <div>
          <h1>Lorem</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            atque fuga voluptatum necessitatibus natus officiis hic, praesentium
            commodi eos!
          </p>
        </div>
        <div className="flex flex-col">
          <Input type="text" placeholder="username" />
          <Input type="password" placeholder="password" />
          <Link to="#" title="Forget password?">Forget password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
