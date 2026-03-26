import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DeploymentProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Deployment({ value, onChange }: DeploymentProps) {
  const [localDeployment, setLocalDeployment] = useState("");
  const currentValue = value ?? localDeployment;
  return (
    <div>
      <Select
        value={currentValue ? currentValue : "select"}
        onValueChange={(value) => {
          const nextValue = value === "select" ? "" : value;
          setLocalDeployment(nextValue);
          onChange?.(nextValue);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select deployment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="select">Select deployment</SelectItem>
          <SelectItem value="Full-Time">Full-Time</SelectItem>
          <SelectItem value="Part-Time">Part-Time</SelectItem>
          <SelectItem value="Reserve">Reserve</SelectItem>
          <SelectItem value="Surplus">Surplus</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
