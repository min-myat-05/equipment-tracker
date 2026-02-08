import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";

function RootLayout() {
  return (
    <>
      <div className="flex h-screen overflow-y-auto">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        <div className="w-[85%] h-dvh">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
