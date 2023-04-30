import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
import vector from "../../../Source/vector";
import GeoJSON from "ol/format/GeoJSON";

function ProjectDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setDetail] = useState([]);
  const [center, setCenter] = useState([-103.9065, 56.9884]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    fetch(`http://192.168.1.102:5000/api/projects/${params.id}`, {
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

  function deleteProject() {
    fetch(`http://192.168.1.102:5000/api/projects/${params.id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        navigate("/projects");
      }
    });
  }

  return (
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
              className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md"
              title="Export"
            />
          </div>
        </div>
        <div className="w-[80%] h-[75vh] m-auto flex flex-wrap gap-[2%] pb-12 ">
          <div className="w-[28%] bg-white shadow-lg rounded-lg">
            <div className="bg-gray-200 h-52 rounded-t-lg flex flex-col justify-center items-center">
              {detail.thumbnail && (
                <img
                  src={`http://192.168.1.102:5000/${detail.thumbnail}`}
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
                <TileLayer
                  source={xyz({
                    url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
                    maxZoom: 20,
                  })}
                  zIndex={0}
                />
                {detail.geo_data_file && (
                  <VectorLayer
                    source={vector({
                      url: `http://192.168.1.102:5000/${detail.geo_data_file}`,
                      format: new GeoJSON(),
                    })}
                  />
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
  );
}

export default ProjectDetailPage;
