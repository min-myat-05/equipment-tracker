import { SquarePen, Trash } from "lucide-react";
import Common from "../component/Common";
import Thead from "../component/thead";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
interface Equipment {
  id: number;
  "ID No.": string;
  "Maker,Model & Type": string;
  Category: string;
  Condition: string;
  Deployment: string;
  Quantity: number;
  Location: string;
  "Date Received": string;
}

const api = "http://localhost:3000/equipments";

export default function Equipments() {
  const [equi, setEqui] = useState<Equipment[]>([]);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setEqui(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const total = equi.filter((item) => item.Category === "Network Device");
  const totalPages = Math.max(1, Math.ceil(total.length / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(total.length, startIndex + rowsPerPage);
  const paginated = total.slice(startIndex, endIndex);
  return (
    <>
      <div>
        <h1 className="text-sm font-bold p-2">
          Network Devices and Accessories
        </h1>
        <Common />
      </div>
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <Thead />
          <tbody className="">
            {paginated.map((item) => (
              <tr
                key={item["ID No."]}
                className="text-center hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer even:bg-muted/50 dark:even:bg-muted/30"
              >
                <td className="text-sm px-4 py-3 text-foreground">
                  {item["ID No."]}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item["Maker,Model & Type"]}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item.Category}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item.Condition}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item.Deployment}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item.Quantity}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item.Location}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {item["Date Received"]}
                </td>
                <td className="flex space-x-3 justify-center px-4 py-3">
                  <button
                    type="button"
                    onClick={() => console.log("edit", item["ID No."])}
                    title={`Edit ${item["Maker,Model & Type"]}`}
                    aria-label={`Edit ${item["Maker,Model & Type"]}`}
                    className="text-sm px-3 py-1.5 rounded-md bg-card hover:bg-amber-50 dark:bg-card dark:hover:bg-amber-50/10 flex items-center"
                  >
                    <SquarePen className="text-amber-600 dark:text-amber-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => console.log("delete", item["ID No."])}
                    title={`Delete ${item["Maker,Model & Type"]}`}
                    aria-label={`Delete ${item["Maker,Model & Type"]}`}
                    className="text-sm px-3 py-1.5 rounded-md text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 flex items-center"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4 px-4">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} - {endIndex} of {total.length}
        </div>

        <div className="flex items-center gap-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <span className="px-3 py-1 bg-card rounded text-sm">
                  Page {currentPage} / {totalPages}
                </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
