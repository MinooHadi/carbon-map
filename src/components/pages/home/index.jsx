import React, { useState } from "react";
import {
  Contorols,
  FullScreenControl,
  Layers,
  Map,
  TileLayer,
} from "../../shared";
import { fromLonLat } from "ol/proj";
import xyz from "../../../Source/xyz";
import logo from "./../../../assets/logo/CCLogo-Black.png";
import { UserAlt } from "../../icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);

  return (
    <div>
      <div className="w-[100%] absolute top-0 z-10 flex justify-between h-[10vh] items-center px-5 bg-white opacity-70">
        <div className="flex items-center">
          <img src={logo} className="w-12" />
          <h1 className="text-2xl font-bold">
            <span className="text-emerald-500">C-Carbon</span> Map
          </h1>
        </div>
        <div className="px-2 py-2 bg-emerald-400 rounded-lg">
          <UserAlt size="1.5rem" color="white" onClick={() => navigate("/login")} />
        </div>
      </div>
      <Map
        center={fromLonLat(center)}
        zoom={zoom}
        className="w-[100vw] h-[100vh]"
      >
        <Layers>
          <TileLayer
            source={xyz({
              url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
              maxZoom: 20,
            })}
            zIndex={0}
          />
        </Layers>
        <Contorols>
          <FullScreenControl />
        </Contorols>
      </Map>
    </div>
  );
}

export default Home;
