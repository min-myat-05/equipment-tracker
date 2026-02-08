import { SquarePen, Trash } from "lucide-react";
import Common from "../component/Common";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Thead from "../component/thead";
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
  const navigate = useNavigate();
  const [equi, setEqui] = useState<Equipment[]>([]);
  const [exportFilter, setExportFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [deploymentFilter, setDeploymentFilter] = useState("");

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setEqui(data))
      .catch((err) => console.error("fetch error:", err));
  }, []);

  const handleDelete = async (item: Equipment) => {
    const confirmDelete = window.confirm(
      `Delete ${item["Maker,Model & Type"]} (${item["ID No."]})?`
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${api}/${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEqui((prev) => prev.filter((record) => record.id !== item.id));
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  const exportCSV = async (filter: string = "all") => {
    try {
      let url = api;
      if (filter && filter !== "all") {
        url += `?Category=${encodeURIComponent(filter)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      const items: Equipment[] = await res.json();

      const headers = [
        "id",
        "ID No.",
        "Maker,Model & Type",
        "Category",
        "Condition",
        "Deployment",
        "Quantity",
        "Location",
        "Date Received",
      ];

      const escape = (v: any) => {
        if (v === null || v === undefined) return "";
        const s = String(v).replace(/"/g, '""');
        return `"${s}"`;
      };

      const rows = items.map((it) =>
        [
          it.id,
          it["ID No."],
          it["Maker,Model & Type"],
          it.Category,
          it.Condition,
          it.Deployment,
          it.Quantity,
          it.Location,
          it["Date Received"],
        ]
          .map(escape)
          .join(","),
      );

      const csv = [
        headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
        ...rows,
      ].join("\r\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlObj;
      a.download = `equipment_${filter}_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlObj);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const normalizeValue = (value: string) => value.trim().toLowerCase();
  const conditionMap: Record<string, string[]> = {
    rn: ["running", "runner"],
    rp: ["repairable"],
    us: ["unserviceable"],
    "w/o": ["write-off", "write off", "writeoff", "w//o"],
  };
  const deploymentMap: Record<string, string[]> = {
    ft: ["full-time", "full time"],
    pt: ["part-time", "part time"],
    rs: ["reserve"],
    sp: ["surplus"],
  };

  const matchesMappedValue = (
    itemValue: string,
    filterValue: string,
    map: Record<string, string[]>,
  ) => {
    const filterNorm = normalizeValue(filterValue);
    if (!filterNorm) return true;
    const itemNorm = normalizeValue(itemValue);
    if (itemNorm === filterNorm) return true;

    const aliasSet = new Set([filterNorm]);
    Object.entries(map).forEach(([code, aliases]) => {
      if (code === filterNorm || aliases.includes(filterNorm)) {
        aliasSet.add(code);
        aliases.forEach((alias) => aliasSet.add(alias));
      }
    });
    return aliasSet.has(itemNorm);
  };

  const filtered = equi.filter((item) => {
    const matchesCondition = matchesMappedValue(
      item.Condition ?? "",
      conditionFilter,
      conditionMap,
    );
    const matchesDeployment = matchesMappedValue(
      item.Deployment ?? "",
      deploymentFilter,
      deploymentMap,
    );
    if (!matchesCondition || !matchesDeployment) return false;

    if (!searchTerm.trim()) return true;
    const searchable = [
      item["ID No."],
      item["Maker,Model & Type"],
      item.Category,
      item.Condition,
      item.Deployment,
      item.Location,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return searchable.includes(normalizeValue(searchTerm));
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(total, startIndex + rowsPerPage);
  const paginated = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, conditionFilter, deploymentFilter]);

  return (
    <div className="bg-background">
      <h1 className="text-sm font-bold p-2">All Equipment</h1>
      <Common
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        conditionValue={conditionFilter}
        onConditionChange={setConditionFilter}
        deploymentValue={deploymentFilter}
        onDeploymentChange={setDeploymentFilter}
      />
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <Thead />
          <tbody className="">
            {paginated.map((equi) => (
              <tr
                key={equi.id}
                className="text-center hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer even:bg-muted/50 dark:even:bg-muted/30"
              >
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi["ID No."]}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi["Maker,Model & Type"]}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi.Category}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi.Condition}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi.Deployment}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi.Quantity}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi.Location}
                </td>
                <td className="text-sm px-4 py-3 text-foreground">
                  {equi["Date Received"]}
                </td>
                <td className="flex space-x-3 justify-center px-4 py-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/equipments/edit/${equi.id}`)}
                    title={`Edit ${equi["Maker,Model & Type"]}`}
                    aria-label={`Edit ${equi["Maker,Model & Type"]}`}
                    className="text-sm px-3 py-1.5 rounded-md bg-card hover:bg-amber-50 dark:bg-card dark:hover:bg-amber-50/10 flex datas-center"
                  >
                    <SquarePen className="text-amber-600 dark:text-amber-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(equi)}
                    title={`Delete ${equi["Maker,Model & Type"]}`}
                    aria-label={`Delete ${equi["Maker,Model & Type"]}`}
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
          Showing {startIndex + 1} - {endIndex} of {total}
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
        <div className="flex items-center gap-2">
          <select
            value={exportFilter}
            onChange={(e) => setExportFilter(e.target.value)}
            className="px-2 py-1 rounded bg-card text-sm"
            aria-label="Export filter"
          >
            <option value="all">All</option>
            <option value="PC">PC</option>
            <option value="Digital">Digital Device</option>
            <option value="Network">Network Device</option>
          </select>

          <button
            type="button"
            onClick={() => exportCSV(exportFilter)}
            className="px-3 py-1 rounded bg-primary text-white text-sm"
            aria-label="Export CSV"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
