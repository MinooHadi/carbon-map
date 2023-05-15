import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CreateNewProject,
  Home,
  Login,
  ProjectDetailPage,
  ProjectReport,
  Projects,
} from "../components/pages";

function GateWay() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create" element={<CreateNewProject />} />
        <Route path="/detail/:id" element={<ProjectDetailPage />} />
        <Route path="/report" element={<ProjectReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default GateWay;
