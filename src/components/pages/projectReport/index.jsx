import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Auth,
  Contorols,
  DragAndDrop,
  FullScreenControl,
  Layers,
  LeftModal,
  Map,
  ReportModal,
  TileLayer,
  VectorLayer,
} from "../../shared";
import { fromLonLat, transform } from "ol/proj";
import xyz from "../../../Source/xyz";
import vector from "../../../Source/vector";
import { useSearchParams } from "react-router-dom";
import { OutlineArrowsExpand } from "../../icons";
import { BASE_URL } from "../../../api";
import VectorSource from "ol/source/Vector";
import { loadFromUrl } from "../../../utils";
import { getCenter } from "ol/extent";

function ProjectReport() {
  const [params] = useSearchParams();
  const [center, setCenter] = useState([-100.9065, 57.9884]);
  const [zoom, setZoom] = useState(5);
  const [showReportModal, setShowReportModal] = useState(true);
  const [showLeftModal, setShowLeftModal] = useState(true);
  const [detail, setDetail] = useState({});
  const [showPending, setShowPending] = useState(true);
  const [dragedFile, setDragedFile] = useState();
  const [geoFileObject, setGeoFileObject] = useState();

  const vectorSourceRef = useRef(new VectorSource());
  const drawSourceRef = useRef(vector({ wrapX: false }));
  const drawObjRef = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/${params.get("pid")}`, {
      method: "GET",
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setShowPending(data.state === 0);
      });
  }, []);

  const xyzSource = useMemo(() => {
    return xyz({
      url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      maxZoom: 20,
    });
  }, []);

  useEffect(() => {
    async function load(url) {
      try {
        await loadFromUrl(url, vectorSourceRef.current);

        const polygonCenter = getCenter(vectorSourceRef.current.getExtent());
        
        setCenter(transform(polygonCenter, "EPSG:3857", "EPSG:4326"));
        setZoom(4);
      } catch(err) {
        alert(err.message);
      }
    }

    switch(detail.state) {
      case 0:
        break
      case 1:
        load(detail.query_report_url);
        break
      case -1:
        load(detail.geo_data_file);
        break
    }
  }, [detail]);

  return (
    <Auth>
      <div className="relative">
        <DragAndDrop setDragedFile={setDragedFile} className="w-[100%] h-[100vh]">
          <Map
            center={fromLonLat(center)}
            zoom={zoom}
            className="w-[100%] h-[100%]"
          >
            <Layers>
              <TileLayer source={xyzSource} zIndex={0} />
              {geoFileObject && (
                <VectorLayer source={vectorSourceRef.current} />
              )}
              <VectorLayer source={drawSourceRef.current} />
            </Layers>
            <Contorols>
              <FullScreenControl />
            </Contorols>
          </Map>
        </DragAndDrop>
        {!showReportModal && (
          <div
            className="absolute bottom-3 right-3 px-2 py-2 bg-emerald-400 rounded-lg"
            onClick={() => setShowReportModal(true)}
          >
            <OutlineArrowsExpand size="1.5rem" color="white" />
          </div>
        )}
        {showReportModal && <ReportModal setShowModal={setShowReportModal} />}

        {showLeftModal && <LeftModal setShowModal={setShowLeftModal} pid={params.get("pid")} disabled={detail.state !== 0}/>}
        
        {showPending && <div style={{
          position: 'absolute', 
          top: 0,
          bottom: 0, 
          right: 0, 
          left: 0,
          margin: 'auto',
          width: '40px', 
          height: '40px', 
          border: '1px solid red',
          borderRadius: '50%'
        }}></div>}
      </div>
    </Auth>
  );
}

export default ProjectReport;
