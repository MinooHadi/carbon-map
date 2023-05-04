import React, { useEffect } from "react";
import useCheckLogin from "../customCheckerHook";
import { useNavigate } from "react-router-dom";

function Auth(props) {
  const isAuthenticate = useCheckLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticate === false) {
      navigate("/login");
    }
  }, [isAuthenticate]);

  return <>{isAuthenticate ? props.children : null}</>;
}

export default Auth;
