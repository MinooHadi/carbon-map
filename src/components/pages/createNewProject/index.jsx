import React, { useState } from "react";
import {
  Button,
  Contorols,
  FullScreenControl,
  Header,
  Input,
  Layers,
  Map,
  TileLayer,
} from "../../shared";
import { fromLonLat } from "ol/proj";
import xyz from "../../../Source/xyz";

function CreateNewProject() {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);

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
            <div className="bg-gray-200 h-52 rounded-t-lg"></div>
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
                    <option value="">Select user</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70%] bg-white p-5 shadow-lg rounded-lg">
            <h1 className="text-lg font-semibold">Province</h1>
            <div className="flex flex-col mt-5">
              <label className="text-sm font-medium text-gray-500 mb-1">
                Choose the most accurate address
              </label>
              <select className="border-2 border-gray-300 px-1 rounded-md mb-4">
                <option value="">Germany</option>
              </select>
              <h1 className="text-lg font-semibold">Data</h1>
              <div className="mt-3">
                <Button
                  title="Upload"
                  className="bg-gray-300 font-semibold py-1 px-3 rounded-l-md"
                />
                <Button
                  title="Draw"
                  className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-r-md"
                />
              </div>
              <div className="mt-3 flex gap-[2%]">
                <div className="w-[65%] h-80">
                  <Map center={fromLonLat(center)} zoom={zoom} className="w-[100%] h-[100%] ">
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
                <div className="w-[33%] bg-yellow-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewProject;
