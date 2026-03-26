import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";

function RootLayout() {
  return (
    <>
      <div className="flex overflow-y-auto">
        <div className="w-[15%]">
          <Sidebar />
        </div>
        <div className="w-[85%] h-dvh max-w-full mx-auto px-6 py-3">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
