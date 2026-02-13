import DeploymentChart from "../component/DeploymentPipeChart";
import ConditionChart from "../component/ConditionPipeChart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { getEquipments } from "@/services/equitmentService";
export default function Dashboard() {
  const [data, setData] = useState<Equipment[]>([]);
  // useEffect(() => {
  //   fetch(api)
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const data = await getEquipments();
      setData(data);
    } catch (error) {
      console.log("Failed to fetch equipments");
    }
  };

  const normalizeCondition = (value: string) => {
    const key = value.trim().toLowerCase();
    if (key === "rn" || key === "running") return "RN";
    if (key === "rp" || key === "repairable") return "RP";
    if (key === "us" || key === "unserviceable") return "US";
    if (key === "w/o" || key === "w//o" || key === "write-off") return "W/O";
    return value.toUpperCase();
  };

  const normalizeDeployment = (value: string) => {
    const key = value.trim().toLowerCase();
    if (key === "ft" || key === "full-time" || key === "full time")
      return "FT";
    if (key === "pt" || key === "part-time" || key === "part time")
      return "PT";
    if (key === "rs" || key === "reserve") return "RS";
    if (key === "sp" || key === "surplus") return "SP";
    return value.toUpperCase();
  };

  const Pc = data.filter((item) => item.Category === "PC");
  const Digital_Device = data.filter(
    (item) => item.Category === "Digital Device",
  );
  const Network_Device = data.filter(
    (item) => item.Category === "Network Device",
  );

  const conditionCounts = data.reduce(
    (acc, item) => {
      const key = normalizeCondition(item.Condition ?? "");
      if (key in acc) acc[key as keyof typeof acc] += 1;
      return acc;
    },
    { RN: 0, RP: 0, US: 0, "W/O": 0 },
  );

  const deploymentCounts = data.reduce(
    (acc, item) => {
      const key = normalizeDeployment(item.Deployment ?? "");
      if (key in acc) acc[key as keyof typeof acc] += 1;
      return acc;
    },
    { FT: 0, PT: 0, RS: 0, SP: 0 },
  );

  const conditionData = [
    { name: "RN (Runner)", value: conditionCounts.RN, fill: "#00C49F" },
    { name: "RP (Repairable)", value: conditionCounts.RP, fill: "#FFBB28" },
    { name: "US (Unserviceable)", value: conditionCounts.US, fill: "#FF8042" },
    { name: "W/O (Write Off)", value: conditionCounts["W/O"], fill: "#FF4D4F" },
  ];

  const deploymentData = [
    { name: "FT (Full Time)", value: deploymentCounts.FT, fill: "#94A3B8" },
    { name: "PT (Part Time)", value: deploymentCounts.PT, fill: "#FB7185" },
    { name: "RS (Reserve)", value: deploymentCounts.RS, fill: "#FBBF24" },
    { name: "SP (Surplus)", value: deploymentCounts.SP, fill: "#60A5FA" },
  ];
  return (
    <>
      <h1 className="text-sm font-bold p-2">Dashboard Page</h1>
      <div className="grid md:grid-cols-4    gap-5 border-shawdow-md text-center   ">
        <Card className="w-full h-32">
          <CardHeader>
            <CardTitle>Total Equipment</CardTitle>
          </CardHeader>
          <CardDescription>{data.length}</CardDescription>
        </Card>
        <Card className="w-full h-32">
          <CardHeader>
            <CardTitle>PC Inventory</CardTitle>
          </CardHeader>
          <CardDescription>{Pc.length}</CardDescription>
        </Card>
        <Card className="w-full h-32">
          <CardHeader>
            <CardTitle>Digital Device</CardTitle>
          </CardHeader>
          <CardDescription>{Digital_Device.length}</CardDescription>
        </Card>
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>Network Device</CardTitle>
          </CardHeader>
          <CardDescription>{Network_Device.length}</CardDescription>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <ConditionChart data={conditionData} />
        <DeploymentChart data={deploymentData} />
      </div>
    </>
  );
}
