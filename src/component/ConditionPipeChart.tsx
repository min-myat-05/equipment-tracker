import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type DataItem = { name: string; value: number; fill: string };

type Props = {
  data?: DataItem[]; // optional override from parent
  isAnimationActive?: boolean;
};

const defaultData: DataItem[] = [
  { name: "RN (Runner)", value: 45, fill: "#00C49F" },
  { name: "RP (Repairable)", value: 25, fill: "#FFBB28" },
  { name: "US (Unserviceable)", value: 20, fill: "#FF8042" },
  { name: "W/O (Write Off)", value: 10, fill: "#FF4D4F" },
];

export default function ConditionPieChart({
  data = defaultData,
  isAnimationActive = true,
}: Props) {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Overview of Conditions</h3>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <aside className="w-auto lg:w-1/3 bg-gray-50 dark:bg-[#0b1220] p-4 rounded-2xl mt-4">
          <ul className="flex flex-col gap-3">
            {data.map((d) => (
              <li key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    style={{ background: d.fill }}
                    className="w-3 h-3 rounded-full inline-block"
                  />
                  <span className="text-sm">{d.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: Pie chart */}
        <div className="w-full lg:w-2/3 h-64 flex items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={6}
                isAnimationActive={isAnimationActive}
                label={({ percent }) =>
                  percent ? `${Math.round(percent * 100)}%` : ""
                }
              >
                {data.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
