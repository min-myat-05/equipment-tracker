import React from "react";

export default function Equipments() {
  // const handleEdit = (id) => {
  //   // placeholder: open edit modal or navigate to edit page
  //   // replace with real backend/navigation logic
  //   // eslint-disable-next-line no-alert
  //   alert(`Edit ${id}`);
  // };

  // const handleDelete = async (id) => {
  //   // placeholder: confirm + call API
  //   // eslint-disable-next-line no-alert
  //   if (!confirm("Delete this equipment?")) return;
  //   // call backend delete here
  //   // eslint-disable-next-line no-alert
  //   alert(`Deleted ${id}`);
  // };
  return (
    <div className="h-screen">
      <div className="font-bold flex justify-between items-center mb-4 p-4">
        <h1 className=" ">Equipments </h1>
      </div>

      <div className="flex items-center mb-4 p-4 gap-4">
        <div className="w-2/3">
          <input
            type="search"
            placeholder="Search equipments..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-300"
          />
        </div>
        <div className="w-1/3 flex gap-4">
          <select
            defaultValue=""
            className="flex-1 border border-gray-200 rounded px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-gray-300"
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
          <button className="-ml-px bg-blue-300 px-4 py-2 rounded flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Equipment
          </button>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-y-auto rounded-b-lg">
        <table className="min-w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-center">
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700">
                Name
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700">
                Category
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700">
                Status
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700 ">
                Location
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700 ">
                Assigned To
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700 ">
                Serial Number
              </th>
              <th className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 font-medium text-gray-700 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="font-small px-4 py-3 text-gray-500">
                MacBook Pro 16
              </td>
              <td className="font-small px-4 py-3 text-gray-500">Laptop</td>
              <td className="font-small px-4 py-3 text-gray-500">Good</td>
              <td className="font-small px-4 py-3 text-gray-500">Office 1</td>
              <td className="font-small px-4 py-3 text-gray-500">12-12-2024</td>
              <td className="font-small px-4 py-3 text-gray-500">#Mp-12-393</td>
              <td className="flex space-x-3 justify-center px-4 py-3">
                <button
                  type="button"
                  // onClick={() => handleEdit("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-white border text-amber-600 hover:bg-amber-50 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  // onClick={() => handleDelete("#Mp-12-393")}
                  className="text-sm px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
