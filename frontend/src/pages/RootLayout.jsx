import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import Dashboard from "./Dashboard";
import Equipments from "./Equipments";
import Maintenance from "./Maintenance";

function RootLayout() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <Header />
        <div className="flex h-full">
          <div className="w-[15%] sm:bg-[#928d8d]">
            <Sidebar />
          </div>
          <div className="w-[85%] ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
