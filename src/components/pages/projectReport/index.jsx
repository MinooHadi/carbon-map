import React, { useState } from "react";
import {
  Contorols,
  FullScreenControl,
  Layers,
  Map,
  Modal,
  TileLayer,
} from "../../shared";
import { fromLonLat } from "ol/proj";
import xyz from "../../../Source/xyz";
import { useSearchParams } from "react-router-dom";
import { OutlineArrowsExpand } from "../../icons";

function ProjectReport() {
  const [params] = useSearchParams();
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="relative">
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
      {!showModal && (
        <div
          className="absolute bottom-3 right-3 px-2 py-2 bg-emerald-400 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          <OutlineArrowsExpand size="1.5rem" color="white" />
        </div>
      )}
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}

export default ProjectReport;
