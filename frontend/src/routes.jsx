import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Equipments from "./pages/Equipments.jsx";
import Maintenance from "./pages/Maintenance.jsx";
import RootLayout from "./pages/RootLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/equipments",
        Component: Equipments,
      },
      {
        path: "/maintenance",
        Component: Maintenance,
      },
    ],
  },
]);
