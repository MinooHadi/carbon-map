import React, { useContext, useEffect, useRef, useState } from "react";
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
  TileLayer,
  VectorLayer,
} from "../../shared";
import { fromLonLat, get } from "ol/proj";
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

function CreateNewProject() {
  const [center, setCenter] = useState([-103.9065, 56.9884]);
  const [zoom, setZoom] = useState(5);
  const [geojsonObject, setGeojsonObject] = useState();
  const [showToolbar, setShowToolbar] = useState(false);
  const { map } = useContext(MapContext);
  const vectorSource = useRef(vector({ wrapX: false }));
  const drawObj = useRef();
  const [labels, setLabels] = useState({});
  const [state, setState] = useState({});

  function getFile(e) {
    setGeojsonObject(`/geojson/${e.target.files[0].name}`);
  }

  function draw(e) {
    map.removeInteraction(drawObj.current);
    drawObj.current = new Draw({
      source: vectorSource.current,
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
    const feature = vectorSource.current.getFeatureById(featureId);
    vectorSource.current.removeFeature(feature);
    delete labels[featureId];
    setLabels({ ...labels });
  }

  useEffect(() => {
    setLabels({ ...labels, ...state });
  }, [state]);

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <div className="w-[80%] m-auto py-6 flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">New projects</h1>
          <div className="flex gap-3">
            <Button
              className="bg-gray-300 font-semibold py-1 px-3 rounded-md"
              title="Cancle"
            />
            <Button
              className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md"
              title="Create project"
            />
          </div>
        </div>
        <div className="w-[80%] m-auto flex flex-wrap gap-[2%] pb-12 ">
          <div className="w-[28%] bg-white shadow-lg rounded-lg">
            <div className="bg-gray-200 h-52 rounded-t-lg flex flex-col justify-center items-center">
              <input type="file" id="imgUpload" hidden />
              <Upload color="white" size="1.5rem" />
              <label htmlFor="imgUpload" className="text-white font-semibold">
                Upload image
              </label>
            </div>
            <div className="h-[350px] p-4">
              <div>
                <Input
                  lable="Name"
                  type="text"
                  className="border-2 border-gray-300 px-1 rounded-md mb-4"
                  placeholder="Project name"
                />
                <label className="text-sm font-medium text-gray-500">
                  Description
                </label>
                <textarea
                  className="border-2 border-gray-300 rounded-md w-[100%] px-1 mt-1 "
                  placeholder="Short description"
                />
              </div>
              <div className="mt-3">
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
              </div>
            </div>
          </div>
          <div className="w-[70%] bg-white p-5 shadow-lg rounded-lg">
            <h1 className="text-lg font-semibold">Province</h1>
            <div className="flex flex-col mt-1">
              <label className="text-sm font-medium text-gray-500 mb-1">
                Choose country
              </label>
              <select className="border-2 border-gray-300 px-1 rounded-md mb-2">
                <option value="">Germany</option>
              </select>
              <label className="text-sm font-medium text-gray-500 mb-1">
                Choose the most accurate address
              </label>
              <select className="border-2 border-gray-300 px-1 rounded-md mb-2">
                <option value="">Germany</option>
              </select>
              <h1 className="text-lg font-semibold">Data</h1>
              <div className="mt-1 flex items-center">
                <input type="file" id="upload" hidden onChange={getFile} />
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
                {/* <div className="w-[65%] h-72">
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
                      {geojsonObject && (
                        <VectorLayer
                          source={vector({
                            format: new GeoJSON(),
                            url: geojsonObject,
                          })}
                        />
                      )}
                      <VectorLayer source={vectorSource.current} />
                    </Layers>
                    <Contorols>
                      <FullScreenControl />
                    </Contorols>
                  </Map>
                </div> */}
                <DragAndDrop>
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
                      {geojsonObject && (
                        <VectorLayer
                          source={vector({
                            format: new GeoJSON(),
                            url: geojsonObject,
                          })}
                        />
                      )}
                      <VectorLayer source={vectorSource.current} />
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
    </>
  );
}

export default CreateNewProject;
