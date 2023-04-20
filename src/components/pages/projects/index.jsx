import React from "react";
import { Button, Header, Input, ProjectCart } from "../../shared";
import { FillPlusCircle, SearchAlt2 } from "../../icons";

function Projects() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 h-[91vh] ">
        <div className="w-[80%] m-auto py-5 flex justify-between">
          <h1 className="text-xl font-semibold">
            Projects <span className="text-gray-400">5</span>
          </h1>
          <div className="relative flex items-center">
            <SearchAlt2 className="absolute left-2" size="1.2rem" />
            <Input className="bg-gray-200 py-1 pl-8 w-[90%] rounded-md" type="Search" placeholder="Search" />
          </div>
          <Button
            className="flex items-center flex-row-reverse bg-emerald-400 text-white font-semibold py-1 px-3 rounded-md gap-1"
            title="New Project"
            icon={<FillPlusCircle size="1.2rem" />}
          />
        </div>
        <ProjectCart />
      </div>
    </>
  );
}

export default Projects;
