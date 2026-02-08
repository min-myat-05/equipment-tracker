import { useState } from "react";

type ConditionProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Condition({ value, onChange }: ConditionProps) {
  const [localCondition, setLocalCondition] = useState("");
  const currentValue = value ?? localCondition;
  return (
    <div>
      <select
        id="condition"
        name="condition"
        className="w-full border border-border bg-input text-foreground px-3 py-2 rounded focus:border-ring"
        value={currentValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          setLocalCondition(nextValue);
          onChange?.(nextValue);
        }}
      >
        <option value="">Select condition</option>
        <option value="Running">Running</option>
        <option value="Repairable">Repairable</option>
        <option value="Unserviceable">Unserviceable</option>
        <option value="Write-off">Write-off</option>
      </select>
    </div>
  );
}
