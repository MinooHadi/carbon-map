import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Auth,
  Contorols,
  FullScreenControl,
  Layers,
  Map,
  Modal,
  TileLayer,
  VectorLayer,
} from "../../shared";
import { fromLonLat } from "ol/proj";
import xyz from "../../../Source/xyz";
import { useSearchParams } from "react-router-dom";
import { OutlineArrowsExpand } from "../../icons";
import { BASE_URL } from "../../../api";
import VectorSource from "ol/source/Vector";
import { loadFromUrl } from "../../../utils";

function ProjectReport() {
  const [params] = useSearchParams();
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);
  const [showModal, setShowModal] = useState(true);
  const [detail, setDetail] = useState({});
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/${params.get("pid")}`, {
      method: "GET",
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => setDetail(data));
  }, []);

  const xyzSource = useMemo(() => {
    return xyz({
      url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      maxZoom: 20,
    });
  }, []);

  useEffect(() => {
    async function load() {
      try {
        await loadFromUrl(detail.geo_data_file, vectorSourceRef.current, setCenter);
        setZoom(4);
      } catch(err) {
        alert(err.message);
      }
    }

    if (detail.geo_data_file) load();
  }, [detail]);

  return (
    <Auth>
      {" "}
      <div className="relative">
        <Map
          center={fromLonLat(center)}
          zoom={zoom}
          className="w-[100vw] h-[100vh]"
        >
          <Layers>
            <TileLayer source={xyzSource} zIndex={0} />
            {detail.geo_data_file && (
              <VectorLayer source={vectorSourceRef.current} />
            )}
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
    </Auth>
  );
}

export default ProjectReport;
