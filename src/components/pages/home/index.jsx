import React, { useState } from "react";
import {
  Contorols,
  FullScreenControl,
  Layers,
  Map,
  TileLayer,
  VectorLayer,
} from "../../shared";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import osm from "../../../Source/osm";
import xyz from "../../../Source/xyz";

let styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};

function Home() {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
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
