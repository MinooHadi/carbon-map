import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./../components/pages/login/index";
import Map from "./../components/pages/map/index";
import Projects from "./../components/pages/projects/index";
import CreateNewProject from "../components/pages/createNewProject";

function GateWay() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create" element={<CreateNewProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default GateWay;
