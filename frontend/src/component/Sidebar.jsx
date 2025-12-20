import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-full bg-white border-r border-gray-200 p-5">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-amber-300 flex items-center justify-center text-white font-semibold">
          DT
        </div>
        <div className="text-sm font-semibold text-gray-800">
          Dept Equipment
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-gray-700 border-l-4 border-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h4V3h10v7h4"
            />
          </svg>
          <span className="text-sm">Dashboard</span>
        </Link>

        <Link
          to="/equipments"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-gray-700 border-l-4 border-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          <span className="text-sm">Equipments</span>
        </Link>

        <Link
          to="/maintenance"
          className="flex items-center gap-3 px-3 py-2 rounded-sm text-gray-700 border-l-4 border-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6a2 2 0 1 1 4 0v6"
            />
          </svg>
          <span className="text-sm">Maintenance</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6">
        <Link
          to="/logout"
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
}
