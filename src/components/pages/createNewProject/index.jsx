import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Contorols,
  DragAndDrop,
  DrawItem,
  FullScreenControl,
  Header,
  Input,
  Layers,
  Map,
  Modal,
  TileLayer,
  VectorLayer,
} from "../../shared";
import { fromLonLat, transform } from "ol/proj";
import xyz from "../../../Source/xyz";
import vector from "../../../Source/vector";
import {
  MousePointer,
  OutlineLocationMarker,
  OutlinePolyline,
  ShapePolygon,
  Upload,
} from "../../icons";
import GeoJSON from "ol/format/GeoJSON";
import MapContext from "../../shared/map/MapContext";
import { Draw } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { getCenter } from "ol/extent";
import { BASE_URL } from "../../../api";
import { useNavigate } from "react-router-dom";

function CreateNewProject() {
  const navigate = useNavigate();
  const [center, setCenter] = useState([-103.9065, 56.9884]);
  const [zoom, setZoom] = useState(5);
  const [geojsonObject, setGeojsonObject] = useState();
  const [showToolbar, setShowToolbar] = useState(false);
  const { map } = useContext(MapContext);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [addresses, setAddresses] = useState({});

  const drawSource = useRef(vector({ wrapX: false }));
  const drawObj = useRef();
  const vectorSource = useRef(new VectorSource());

  const [labels, setLabels] = useState({});
  const [state, setState] = useState({});
  const formRef = useRef();

  const xyzSource = useMemo(() => {
    return xyz({
      url: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      maxZoom: 20,
    });
  }, []);

  useEffect(() => {
    if (!geojsonObject) return;

    vectorSource.current.addFeatures(
      new GeoJSON({
        featureProjection: "EPSG:3857",
      }).readFeatures(geojsonObject)
    );
    let polygonCenter = getCenter(vectorSource.current.getExtent());
    setCenter(transform(polygonCenter, "EPSG:3857", "EPSG:4326"));
  }, [geojsonObject]);

  async function getFile(e) {
    e.target.files[0].text().then((data) => {
      vectorSource.current.clear();
      setGeojsonObject(JSON.parse(data));
    });
  }

  async function addressSelected(e) {
    try {
      const res = await fetch(`${BASE_URL}/${e.target.value}`, {
        method: "GET",
      });
      if (res.status === 200) {
        vectorSource.current.clear();
        setGeojsonObject(await res.json());
      }
    } catch (err) {
      alert(err);
    }
  }

  function draw(e) {
    map.removeInteraction(drawObj.current);
    drawObj.current = new Draw({
      source: drawSource.current,
      type: e.currentTarget.dataset.type,
    });
    map.addInteraction(drawObj.current);
    drawObj.current.on("drawend", (e) => {
      const feature = e.feature;
      const id = Date.now();
      feature.setId(id);
      let label = prompt("enter label");
      setState({ [id]: label });
    });
  }

  function deleteItem(e) {
    const featureId = +e.currentTarget.dataset.id;
    const feature = drawSource.current.getFeatureById(featureId);
    drawSource.current.removeFeature(feature);
    delete labels[featureId];
    setLabels({ ...labels });
  }

  useEffect(() => {
    setLabels({ ...labels, ...state });
  }, [state]);

  function createProject() {
    const data = new FormData(formRef.current);
    fetch(`${BASE_URL}/project`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        throw "";
      })
      .then((data) => navigate(`/query?pid=${data.id}`));
  }

  useEffect(() => {
    fetch(`${BASE_URL}/api/countries`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${BASE_URL}/api/geo-data/`, {
        method: "POST",
        body: JSON.stringify({
          country: selectedCountry,
        }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw "";
        })
        .then((data) => setAddresses(data))
        .catch();
    }
  }, [selectedCountry]);

  return (
    <div className="h-[100vh] ">
      <Header />
      <div className="bg-gray-50 h-[90vh] ">
        <div className="w-[80%] h-[10vh] m-auto py-6 flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">New projects</h1>
          <div className="flex gap-3">
            <Button
              className="bg-gray-300 font-semibold py-1 px-3 rounded-md"
              title="Cancle"
            />
            <Button
              className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md"
              title="Create project"
              onClick={createProject}
            />
          </div>
        </div>
        <div className="w-[80%] h-[75vh] m-auto flex flex-wrap gap-[2%] pb-12 ">
          <div className="w-[28%] bg-white shadow-lg rounded-lg">
            <form id="form" ref={formRef}>
              <div className="bg-gray-200 h-52 rounded-t-lg flex flex-col justify-center items-center">
                <input type="file" id="imgUpload" hidden name="thumbnail" />
                <Upload color="white" size="1.5rem" />
                <label htmlFor="imgUpload" className="text-white font-semibold">
                  Upload image
                </label>
              </div>
              <div className="p-[2%]">
                <Input
                  name="name"
                  lable="Name"
                  type="text"
                  className="border-2 border-gray-300 px-1 rounded-md mb-4"
                  placeholder="Project name"
                />
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  name="description"
                  className="border-2 border-gray-300 rounded-md w-[100%] px-1 mt-1 "
                  placeholder="Short description"
                />
              </div>
            </form>

            {/* <div className="mt-3">
                <h1 className="font-semibold text-lg mb-2">Users</h1>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-500 mb-1">
                    Project users
                  </label>
                  <select className="border-2 border-gray-300 px-1 rounded-md mb-4">
                    <option value="" disabled selected>
                      Select user
                    </option>
                  </select>
                </div>
              </div> */}
          </div>
          <div className="w-[70%] bg-white p-5 shadow-lg rounded-lg">
            <h1 className="text-lg font-semibold">Province</h1>
            <div className="flex flex-col mt-1">
              <label className="text-sm font-medium text-gray-500 mb-1">
                Choose country
              </label>
              <select
                className="border-2 border-gray-300 px-1 rounded-md mb-2"
                form="form"
                name="country"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value=""></option>
                {country.map((item) => (
                  <option value={item.code}> {item.name} </option>
                ))}
              </select>
              <label className="text-sm font-medium text-gray-500 mb-1">
                Choose the most accurate address
              </label>
              <select
                className="border-2 border-gray-300 px-1 rounded-md mb-2"
                form="form"
                name="province"
                onChange={addressSelected}
              >
                <option value=""></option>
                {Object.entries(addresses).map((item) => (
                  <option value={item[1]}>{item[0]}</option>
                ))}
              </select>
              <h1 className="text-lg font-semibold">Data</h1>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="upload"
                  hidden
                  onChange={getFile}
                  form="form"
                  name="geo_data_file"
                />
                <label
                  htmlFor="upload"
                  className="bg-gray-300 font-semibold text-sm py-1 px-3 rounded-l-md"
                >
                  Upload
                </label>
                <Button
                  title="Draw"
                  className="bg-emerald-400 text-white font-semibold py-1 px-3 text-sm rounded-r-md"
                  onClick={() => setShowToolbar(!showToolbar)}
                />
                {showToolbar && (
                  <div className="flex ml-5 gap-2">
                    <div
                      className="w-7 h-7 bg-gray-300 rounded-md flex justify-center items-center"
                      data-type="Polygon"
                      onClick={draw}
                    >
                      <ShapePolygon />
                    </div>
                    <div
                      className="w-7 h-7 bg-gray-300 rounded-md flex justify-center items-center"
                      data-type="LineString"
                      onClick={draw}
                    >
                      <OutlinePolyline />
                    </div>
                    <div
                      className="w-7 h-7 bg-gray-300 rounded-md flex justify-center items-center"
                      data-type="Point"
                      onClick={draw}
                    >
                      <OutlineLocationMarker />
                    </div>
                    <div
                      className="w-7 h-7 bg-gray-300 rounded-md flex justify-center items-center"
                      onClick={() => map.removeInteraction(drawObj.current)}
                    >
                      <MousePointer
                        onClick={() => map.removeInteraction(drawObj.current)}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 flex gap-[2%]">
                <DragAndDrop
                  setState={(data) => {
                    vectorSource.current.clear();
                    setGeojsonObject(data);
                  }}
                >
                  <Map
                    center={fromLonLat(center)}
                    zoom={zoom}
                    className="w-[100%] h-[100%] "
                  >
                    <Layers>
                      <TileLayer source={xyzSource} zIndex={0} />
                      {geojsonObject && (
                        <VectorLayer source={vectorSource.current} />
                      )}
                      <VectorLayer source={drawSource.current} />
                    </Layers>
                    <Contorols>
                      <FullScreenControl />
                    </Contorols>
                  </Map>
                </DragAndDrop>
                <div className="w-[33%] max-h-72 overflow-y-scroll no-scrollbar">
                  {Object.entries(labels).map((item) => (
                    <DrawItem
                      title={item[1]}
                      dataId={item[0]}
                      onClick={deleteItem}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewProject;
