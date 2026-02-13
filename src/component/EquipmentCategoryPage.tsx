import { useEffect, useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Common from "../component/Common";
import Thead from "../component/thead";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { deleteEquipment, getEquipments } from "../services/equitmentService";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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

type EquipmentCategoryPageProps = {
  category?: string;
  showFilters?: boolean;
  showExport?: boolean;
};

export default function EquipmentCategoryPage({
  category,
  showFilters = true,
  showExport = false,
}: EquipmentCategoryPageProps) {
  const navigate = useNavigate();
  const [equi, setEqui] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [deploymentFilter, setDeploymentFilter] = useState("");
  useEffect(() => {
    getEquipments()
      .then((data) => setEqui(data))
      .catch((err) => {
        console.error("fetch error:", err);
        setLoadError(
          err instanceof Error ? err.message : "Failed to load data",
        );
      })
      .finally(() => setIsLoading(false));
  }, []);
  const handleDelete = async (item: Equipment) => {
    const confirmDelete = window.confirm(
      `Delete ${item["Maker,Model & Type"]} (${item["ID No."]})?`,
    );
    if (!confirmDelete) return;
    try {
      await deleteEquipment(item.id);
      setEqui((prev) => prev.filter((record) => record.id !== item.id));
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  const exportCSV = (items: Equipment[]) => {
    try {
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
      a.download = `equipment_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlObj);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
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

  const scoped = category
    ? equi.filter((item) => item.Category === category)
    : equi;

  const filtered = showFilters
    ? scoped.filter((item) => {
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
      })
    : scoped;

  const total = filtered;
  const totalPages = Math.max(1, Math.ceil(total.length / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(total.length, startIndex + rowsPerPage);
  const paginated = total.slice(startIndex, endIndex);

  useEffect(() => {
    if (!showFilters) return;
    setCurrentPage(1);
  }, [showFilters, searchTerm, conditionFilter, deploymentFilter]);

  return (
    <>
      <div>
        <Common
          searchValue={showFilters ? searchTerm : undefined}
          onSearchChange={showFilters ? setSearchTerm : undefined}
          conditionValue={showFilters ? conditionFilter : undefined}
          onConditionChange={showFilters ? setConditionFilter : undefined}
          deploymentValue={showFilters ? deploymentFilter : undefined}
          onDeploymentChange={showFilters ? setDeploymentFilter : undefined}
        />
      </div>
      <div className="w-full border border-border rounded-xl overflow-hidden max-h-[460px] overflow-x-auto overflow-y-scroll">
        <Table className="min-w-[990px] w-full">
          <Thead />
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  className="text-sm px-4 py-6 text-muted-foreground text-center"
                  colSpan={9}
                >
                  Loading equipment...
                </TableCell>
              </TableRow>
            ) : loadError ? (
              <TableRow>
                <TableCell
                  className="text-sm px-4 py-6 text-destructive text-center"
                  colSpan={9}
                >
                  {loadError}
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  className="text-sm px-4 py-6 text-muted-foreground text-center"
                  colSpan={9}
                >
                  No equipment found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => (
                <TableRow
                  key={item["ID No."]}
                  className="text-center hover:bg-accent/50 dark:hover:bg-accent/30 cursor-pointer even:bg-muted/50 dark:even:bg-muted/30 border-b border-border last:border-b-0"
                >
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item["ID No."]}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item["Maker,Model & Type"]}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item.Category}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item.Condition}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item.Deployment}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item.Quantity}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item.Location}
                  </TableCell>
                  <TableCell className="text-sm px-4 py-3 text-foreground text-center">
                    {item["Date Received"]}
                  </TableCell>
                  <TableCell className="flex space-x-3 justify-center px-4 py-3">
                    <button
                      type="button"
                      onClick={() => navigate(`/equipments/edit/${item.id}`)}
                      title={`Edit ${item["Maker,Model & Type"]}`}
                      aria-label={`Edit ${item["Maker,Model & Type"]}`}
                      className="rounded-lg p-2 text-amber-400 hover:bg-amber-400/20 dark:text-amber-400 dark:hover:bg-amber-400/20"
                    >
                      <SquarePen />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      title={`Delete ${item["Maker,Model & Type"]}`}
                      aria-label={`Delete ${item["Maker,Model & Type"]}`}
                      className="rounded-lg p-2 text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/20"
                    >
                      <Trash />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 px-4 flex items-center justify-between gap-4">
        {totalPages > 1 ? (
          <>
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
          </>
        ) : (
          <div />
        )}
        {showExport && !isLoading && !loadError && filtered.length > 0 ? (
          <button
            type="button"
            onClick={() => exportCSV(filtered)}
            className="px-3 py-1 rounded bg-primary text-white text-sm"
            aria-label="Export CSV"
          >
            Export CSV
          </button>
        ) : null}
      </div>
    </>
  );
}
