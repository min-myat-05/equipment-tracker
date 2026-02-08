import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import Dashboard from "./pages/Dashboard";
import Equipments from "./pages/Equipments";
import RootLayout from "./pages/RootLayout";
import AddEquipments from "./component/AddEquipments";
import PC from "./pages/PC";
import Digital_Device from "./pages/Digital_Device";
import Network_Device from "./pages/Network_Device";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginForm,
  },
  {
    Component: RootLayout,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/equipments",
        Component: Equipments,
      },
      {
        path: "/equipments/add",
        Component: AddEquipments,
      },
      {
        path: "/equipments/edit/:id",
        Component: AddEquipments,
      },
      {
        path: "/pc",
        Component: PC,
      },
      {
        path: "/pc/add",
        Component: AddEquipments,
      },
      {
        path: "/digital-device",
        Component: Digital_Device,
      },
      {
        path: "/digital-device/add",
        Component: AddEquipments,
      },
      {
        path: "/network-device",
        Component: Network_Device,
      },
      {
        path: "/network-device/add",
        Component: AddEquipments,
      },
    ],
  },
]);
