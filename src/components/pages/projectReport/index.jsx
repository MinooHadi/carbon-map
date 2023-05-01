import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Contorols,
  FullScreenControl,
  Layers,
  Map,
  Modal,
  TileLayer,
  VectorLayer,
} from "../../shared";
import { fromLonLat, transform } from "ol/proj";
import xyz from "../../../Source/xyz";
import { useSearchParams } from "react-router-dom";
import { OutlineArrowsExpand } from "../../icons";
import { BASE_URL } from "../../../api";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { getCenter } from "ol/extent";

function ProjectReport() {
  const [params] = useSearchParams();
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);
  const [showModal, setShowModal] = useState(true);
  const [detail, setDetail] = useState([]);
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/${params.get("pid")}`, {
      method: "GET",
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
    if (detail) {
      fetch(`${BASE_URL}/${detail.geo_data_file}`, {
        method: "GET",
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          vectorSourceRef.current.addFeatures(
            new GeoJSON({
              featureProjection: "EPSG:3857",
            }).readFeatures(data)
          );
          let polygonCenter = getCenter(vectorSourceRef.current.getExtent());
          setCenter(transform(polygonCenter, "EPSG:3857", "EPSG:4326"));
        });
      setZoom(4);
    }
  }, [detail]);

  return (
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
  );
}

export default ProjectReport;
