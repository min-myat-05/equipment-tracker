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
  const total = equi.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(total, startIndex + rowsPerPage);
  const currentRows = equi.slice(startIndex, endIndex);

  return (
    <div>
      {/* Render current rows */}
      <ul>
        {currentRows.map((equi) => (
          <li key={equi["ID No."]}>{equi["Maker,Model & Type"]}</li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex items-center gap-3 mt-4">
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
  );
}
