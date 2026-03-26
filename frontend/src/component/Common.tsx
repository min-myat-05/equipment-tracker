import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const resolvedCondition = conditionValue ?? localCondition;
  const resolvedDeployment = deploymentValue ?? localDeployment;

  const path = location.pathname;

  let type = "equipments";

  if (path.startsWith("/pc")) type = "pc";
  else if (path.startsWith("/digital-device")) type = "digital-device";
  else if (path.startsWith("/network-device")) type = "network-device";
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center p-3">
      <input
        type="search"
        placeholder="Search equipments..."
        className="w-full md:flex-1 px-3 py-2 border border-border rounded-md text-foreground placeholder:text-muted-foreground bg-input focus:outline-none focus:border-ring"
        value={searchValue ?? localSearch}
        onChange={(event) => {
          const nextValue = event.target.value;
          setLocalSearch(nextValue);
          onSearchChange?.(nextValue);
        }}
      />
      <Select
        value={resolvedCondition ? resolvedCondition : "all"}
        onValueChange={(value) => {
          const nextValue = value === "all" ? "" : value;
          setLocalCondition(nextValue);
          onConditionChange?.(nextValue);
        }}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="All Conditions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Conditions</SelectItem>
          <SelectItem value="RN">RN-Runner</SelectItem>
          <SelectItem value="RP">RP-Repairable</SelectItem>
          <SelectItem value="US">US-Unserviceable</SelectItem>
          <SelectItem value="W/O">W/O-Write Off</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={resolvedDeployment ? resolvedDeployment : "all"}
        onValueChange={(value) => {
          const nextValue = value === "all" ? "" : value;
          setLocalDeployment(nextValue);
          onDeploymentChange?.(nextValue);
        }}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="All Deployments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Deployments</SelectItem>
          <SelectItem value="FT">FT-Full Time</SelectItem>
          <SelectItem value="PT">PT-Part Time</SelectItem>
          <SelectItem value="RS">RS-Reserve</SelectItem>
          <SelectItem value="SP">SP-Surplus</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={() => navigate(`/${type}/add`)}
        className="bg-primary rounded w-auto"
      >
        <Plus />
        Add Equipment
      </Button>
    </div>
  );
}
