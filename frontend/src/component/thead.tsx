import { titleData } from "../../data/data";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function thead() {
  return (
    <TableHeader className="border-b border-border bg-muted/50 sticky top-0 z-50">
      <TableRow className="text-center h-11 bg-muted/50">
        {titleData.map((item) => (
          <TableHead
            key={item.name}
            scope="col"
            className="text-base font-semibold text-foreground text-center sticky top-0 bg-muted/50"
          >
            {item.name}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
