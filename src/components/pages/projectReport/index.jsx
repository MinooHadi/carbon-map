import React from "react";
import { useParams } from "react-router-dom";

function ProjectReport() {
    const params = useParams()
  return <h1>Report page for the project with ID {params.id} </h1>;
}

export default ProjectReport;
