import { NavLink } from "react-router-dom";
import { UserPlus, LayoutDashboard, Wrench, Computer, Gpu, Network } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useAuth } from "@/context/AuthContext";
export default function Sidebar() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "super_admin";
  const linkBase =
    "flex items-center gap-3 px-2 py-2 rounded border-l-4 transition-colors duration-200";
  return (
    <aside className="bg-[#f7f8f8] dark:bg-sidebar-border p-5 h-full">
      <div className="mb-4">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-2 py-2 rounded hover:bg-primary/5"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-sm shrink-0">
            <img
              src={logo}
              alt="Equipment Tracker logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold leading-tight">
            Equipment Tracker
          </span>
        </NavLink>
      </div>

      <div className="h-px bg-slate-200 dark:bg-slate-700 my-3" />

      <nav className="flex flex-col gap-1 mt-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-primary/10 border-primary"
                : "border-transparent hover:bg-primary/30"
            }`
          }
        >
          <LayoutDashboard />
          <span className="text-sm">Dashboard</span>
        </NavLink>

        <NavLink
          to="/equipments"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-primary/10 border-primary"
                : "border-transparent hover:bg-primary/30"
            }`
          }
        >
          <Wrench />
          <span className="text-sm">Equipment</span>
        </NavLink>

        <NavLink
          to="/pc"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-primary/10 border-primary"
                : "border-transparent hover:bg-primary/30"
            }`
          }
        >
          <Computer />
          <span className="text-sm">PC</span>
        </NavLink>

        <NavLink
          to="/digital-device"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-primary/10 border-primary"
                : "border-transparent hover:bg-primary/30"
            }`
          }
        >
          <Gpu />
          <span className="text-sm">Digital Device</span>
        </NavLink>

        <NavLink
          to="/network-device"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? "bg-primary/10 border-primary"
                : "border-transparent hover:bg-primary/30"
            }`
          }
        >
          <Network />
          <span className="text-sm">Network Device</span>
        </NavLink>
        {isSuperAdmin && (
          <NavLink
            to="/admin/create"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-primary/10 border-primary"
                  : "border-transparent hover:bg-primary/30"
              }`
            }
          >
            <UserPlus />
            <span className="text-sm">Create Admin</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
