import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";

type CommonProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  conditionValue?: string;
  onConditionChange?: (value: string) => void;
  deploymentValue?: string;
  onDeploymentChange?: (value: string) => void;
};

export default function Common({
  searchValue,
  onSearchChange,
  conditionValue,
  onConditionChange,
  deploymentValue,
  onDeploymentChange,
}: CommonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState("");
  const [localCondition, setLocalCondition] = useState("");
  const [localDeployment, setLocalDeployment] = useState("");

  const path = location.pathname;

  let type = "equipments";

  if (path.startsWith("/pc")) type = "pc";
  else if (path.startsWith("/digital-device")) type = "digital-device";
  else if (path.startsWith("/network-device")) type = "network-device";
  return (
    <div>
      <div className="flex items-center mb-4 p-3 gap-4">
        <div className="w-1/2">
          <input
            type="search"
            placeholder="Search equipments..."
            className="w-full px-3 py-2 border border-border rounded-md text-foreground placeholder:text-muted-foreground bg-input focus:outline-none focus:border-ring"
            value={searchValue ?? localSearch}
            onChange={(event) => {
              const nextValue = event.target.value;
              setLocalSearch(nextValue);
              onSearchChange?.(nextValue);
            }}
          />
        </div>
        <div className="w-1/2 flex gap-4">
          <select
            value={conditionValue ?? localCondition}
            className="flex-1 border border-border rounded px-3 py-2 text-foreground bg-input focus:outline-none focus:border-ring"
            onChange={(event) => {
              const nextValue = event.target.value;
              setLocalCondition(nextValue);
              onConditionChange?.(nextValue);
            }}
          >
            <option value="">All Conditions</option>
            <option value="RN">RN-Runner</option>
            <option value="RP">RP-Repairable</option>
            <option value="US">US-Unservicesble</option>
            <option value="W/O">W/O-Write Off</option>
          </select>
          <select
            value={deploymentValue ?? localDeployment}
            className="flex-1 border border-border rounded px-3 py-2 text-foreground bg-input focus:outline-none focus:border-ring"
            onChange={(event) => {
              const nextValue = event.target.value;
              setLocalDeployment(nextValue);
              onDeploymentChange?.(nextValue);
            }}
          >
            <option value="">All Deployments</option>
            <option value="FT">FT-Full Time</option>
            <option value="PT">PT-Part Time</option>
            <option value="RS">RS-Reserve</option>
            <option value="SP">SP-Surplus</option>
          </select>
          <button
            onClick={() => navigate(`/${type}/add`)}
            className="bg-primary px-4 py-2 rounded flex items-center"
          >
            <Plus />
            Add Equipment
          </button>
        </div>
      </div>
    </div>
  );
}
