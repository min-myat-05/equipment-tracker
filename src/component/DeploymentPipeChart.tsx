import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type DataItem = { name: string; value: number; fill: string };

type Props = {
  data?: DataItem[]; // optional override from parent
  isAnimationActive?: boolean;
};

const defaultData: DataItem[] = [
  { name: "FT (Full Time)", value: 45, fill: "#94A3B8" },
  { name: "PT (Part Time)", value: 25, fill: "#FB7185" },
  { name: "RS (Reserve)", value: 20, fill: "#FBBF24" },
  { name: "SP (Surplus)", value: 10, fill: "#60A5FA" },
];

export default function DeploymentPieChart({
  data = defaultData,
  isAnimationActive = true,
}: Props) {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Overview of Deployment</h3>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <aside className="w-50 h-42 lg:w-1/3 bg-gray-50 dark:bg-[#0b1220] p-4 rounded-2xl mt-4">
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
