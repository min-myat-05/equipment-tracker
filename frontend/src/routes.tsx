import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import Dashboard from "./pages/Dashboard";
import Equipments from "./pages/Equipments";
import RootLayout from "./pages/RootLayout";
import AddEquipments from "./component/AddEquipments";
import PC from "./pages/PC";
import Digital_Device from "./pages/Digital_Device";
import Network_Device from "./pages/Network_Device";
import AuthGate from "./component/AuthGate";
import PendingApproval from "./pages/PendingApproval";
import Notifications from "./pages/Notifications";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginForm,
  },
  {
    path: "/register",
    Component: RegisterForm,
  },
  {
    Component: AuthGate,
    children: [
      {
        path: "/pending",
        Component: PendingApproval,
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
          {
            path: "/notifications",
            Component: Notifications,
          },
        ],
      },
    ],
  },
]);
