import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CreateNewProject,
  Home,
  Login,
  ProjectDetailPage,
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
        <Route path="/detail:id" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default GateWay;
