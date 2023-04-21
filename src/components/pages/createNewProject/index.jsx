import React from "react";
import { Button, Header, Input } from "../../shared";

function CreateNewProject() {
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
                <Button title="Upload" className="bg-gray-300 font-semibold py-1 px-3 rounded-l-md" />
                <Button title="Draw" className="bg-emerald-400 text-white font-semibold py-1 px-3 rounded-r-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewProject;
