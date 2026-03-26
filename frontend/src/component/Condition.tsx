import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ConditionProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Condition({ value, onChange }: ConditionProps) {
  const [localCondition, setLocalCondition] = useState("");
  const currentValue = value ?? localCondition;
  return (
    <div>
      <Select
        value={currentValue ? currentValue : "select"}
        onValueChange={(value) => {
          const nextValue = value === "select" ? "" : value;
          setLocalCondition(nextValue);
          onChange?.(nextValue);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="select">Select condition</SelectItem>
          <SelectItem value="Running">Running</SelectItem>
          <SelectItem value="Repairable">Repairable</SelectItem>
          <SelectItem value="Unserviceable">Unserviceable</SelectItem>
          <SelectItem value="Write-off">Write-off</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
