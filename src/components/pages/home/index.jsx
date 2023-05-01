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

function Home() {
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);

  return (
    <div>
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
