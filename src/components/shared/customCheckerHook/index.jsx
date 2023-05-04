import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../api";

function useCheckLogin() {
  const [isAuthenticate, setIsAuthenticate] = useState(undefined);

  useEffect(() => {
    fetch(`${BASE_URL}/api/check`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setIsAuthenticate(true);
      } else if (res.status === 401) {
        setIsAuthenticate(false);
      } else {
        alert("fail to fetch");
      }
    });
  }, []);

  return isAuthenticate;
}

export default useCheckLogin;
