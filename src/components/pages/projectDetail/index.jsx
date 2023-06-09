import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Auth,
  Button,
  Contorols,
  FullScreenControl,
  Header,
  Input,
  Layers,
  Map,
  TileLayer,
  VectorLayer,
} from "../../shared";
import xyz from "../../../Source/xyz";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { BASE_URL } from "../../../api";
import { loadFromUrl } from "../../../utils";

function ProjectDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [center, setCenter] = useState([-103.9065, 56.9884]);
  const [disabled, setDisabled] = useState(true);
  const [zoom, setZoom] = useState(5);
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    fetch(`${BASE_URL}/api/projects/${params.id}`, {
      method: "GET",
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {setDetail(data)});
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
        await loadFromUrl(`${BASE_URL}/${detail.geo_data_file}`, vectorSourceRef.current, setCenter);
        setZoom(4);
      } catch(err) {
        alert(err.message);
      }
    }

    if (detail.geo_data_file) {
      load();
      setDisabled(false);
    }
  }, [detail]);

  function deleteProject() {
    fetch(`${BASE_URL}/api/projects/${params.id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        navigate("/projects");
      }
    });
  }

  return (
    <Auth>
      <div className=" h-[100vh] ">
        <Header />
        <div className="bg-gray-50 h-[90vh] ">
          <div className="w-[80%] h-[10vh] m-auto py-6 flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold"> {detail.name} </h1>
            <div className="flex gap-3">
              <Button
                className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md"
                title="Delete project"
                onClick={deleteProject}
              />
              <Button
                className={`${disabled ? "bg-gray-300 text-gray-400" : "bg-emerald-400 text-white"} font-semibold py-1 px-3 rounded-md`}
                title="Report"
                onClick={() => navigate(`/query?pid=${params.id}`)}
                disabled={disabled}
              />
              <input
                type="file"
                id="upload"
                hidden
                onChange={}
                form="form"
                name="geo_data_file"
              />
              <label
                htmlFor="upload"
                className={`${disabled ? "bg-emerald-400 text-white" : "bg-gray-300 text-gray-400"} font-semibold text-sm py-1 px-3 rounded-md text-center`}
              >
                Upload
              </label>
            </div>
          </div>
          <div className="w-[80%] h-[75vh] m-auto flex flex-wrap gap-[2%] pb-12 ">
            <div className="w-[28%] bg-white shadow-lg rounded-lg">
              <div className="bg-gray-200 h-52 rounded-t-lg flex flex-col justify-center items-center">
                {detail.thumbnail && (
                  <img
                    src={`${BASE_URL}/${detail.thumbnail}`}
                    className="w-[100%] h-[100%] object-cover rounded-t-lg"
                  />
                )}
              </div>
              <div className="p-[2%]">
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <p>{detail.description && detail.description}</p>
              </div>
            </div>
            <div className="w-[70%] bg-white p-5 shadow-lg rounded-lg">
              <Map
                center={fromLonLat(center)}
                zoom={zoom}
                className="w-[100%] h-[100%] "
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
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default ProjectDetailPage;
