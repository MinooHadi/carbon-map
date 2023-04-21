import React from "react";
import { Button, Header, Input, ProjectCart } from "../../shared";
import { FillPlusCircle, SearchAlt2 } from "../../icons";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="bg-gray-50">
        <div className="w-[80%] m-auto py-6 flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold">
            Projects <span className="text-gray-400">5</span>
          </h1>
          <div className="relative flex items-center">
            <SearchAlt2 className="absolute left-2" size="1.2rem" />
            <Input
              className="bg-gray-200 py-1 pl-8 rounded-md focus:w-[300px] "
              type="Search"
              placeholder="Search"
            />
          </div>
          <Button
            className="flex items-center flex-row-reverse bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md gap-1"
            title="New Project"
            icon={<FillPlusCircle size="1.2rem" />}
            onClick={() => navigate("/create")}
          />
        </div>
        <div className="w-[80%] m-auto flex flex-wrap gap-6">
          <ProjectCart />
          <ProjectCart />
          <ProjectCart />
          <ProjectCart />
          <ProjectCart />
        </div>
      </div>
    </>
  );
}

export default Projects;
