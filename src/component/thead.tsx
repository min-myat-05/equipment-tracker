import { titleData } from "../../data/data";
export default function thead() {
  return (
    <thead className="border-b border-border">
      <tr className="text-center h-18">
        {titleData.map((item) => (
          <th
            key={item.name}
            scope="col"
            className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm px-4 py-2 text-base font-medium text-foreground"
          >
            {item.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
