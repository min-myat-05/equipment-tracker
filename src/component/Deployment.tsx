import { useState } from "react";

type DeploymentProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Deployment({ value, onChange }: DeploymentProps) {
  const [localDeployment, setLocalDeployment] = useState("");
  const currentValue = value ?? localDeployment;
  return (
    <div>
      <select
        id="deployment"
        name="deployment"
        className="w-full border border-border bg-input text-foreground px-3 py-2 rounded focus:border-ring"
        value={currentValue}
        onChange={(event) => {
          const nextValue = event.target.value;
          setLocalDeployment(nextValue);
          onChange?.(nextValue);
        }}
      >
        <option value="">Select deployment</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Reserve">Reserve</option>
        <option value="Surplus">Surplus</option>
      </select>
    </div>
  );
}
