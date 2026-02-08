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
export default function Dashboard() {
  const api = "http://localhost:3000/equipments";
  const [data, setData] = useState<Equipment[]>([]);
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const Pc = data.filter((item) => item.Category === "PC");
  const Digital_Device = data.filter(
    (item) => item.Category === "Digital Device",
  );
  const Network_Device = data.filter(
    (item) => item.Category === "Network Device",
  );
  return (
    <>
      <h1 className="text-sm font-bold p-2">Dashboard Page</h1>
      <div className=" flex w-auto h-auto p-4 space-x-4 border-shawdow-md text-center   ">
        <Card className="w-1/4 h-32">
          <CardHeader>
            <CardTitle>Total Equipment</CardTitle>
          </CardHeader>
          <CardDescription>{data.length}</CardDescription>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle>PC Inventory</CardTitle>
          </CardHeader>
          <CardDescription>{Pc.length}</CardDescription>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle>Digital Device</CardTitle>
          </CardHeader>
          <CardDescription>{Digital_Device.length}</CardDescription>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle>Network Device</CardTitle>
          </CardHeader>
          <CardDescription>{Network_Device.length}</CardDescription>
        </Card>
      </div>
      <div className="flex gap-4 p-4">
        <ConditionChart />
        <DeploymentChart />
      </div>
    </>
  );
}
