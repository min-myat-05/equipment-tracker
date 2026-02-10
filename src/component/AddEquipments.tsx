import React, { useEffect, useMemo, useState } from "react";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Deployment from "../component/Deployment";
import Condition from "../component/Condition";
import Category from "./Category";

interface EquipmentPayload {
  "ID No.": string;
  "Maker,Model & Type": string;
  Category: string;
  Condition: string;
  Deployment: string;
  Quantity: number;
  Location: string;
  "Date Received": string;
  Description?: string;
}

const api = "https://equipment-tracker-v1-1.onrender.com/";

export default function AddEquipments() {
  const navigate = useNavigate();
  const { id } = useParams();
  const recordId = useMemo(() => (id ? Number(id) : null), [id]);
  const isEditing = recordId !== null && !Number.isNaN(recordId);

  const [idNo, setIdNo] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("PC");
  const [condition, setCondition] = useState("");
  const [deployment, setDeployment] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    setIsLoading(true);
    fetch(`${api}/${recordId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load equipment");
        return res.json();
      })
      .then((data: EquipmentPayload) => {
        const normalizeCondition = (value: string) => {
          const key = value.trim().toLowerCase();
          if (key === "rn" || key === "running") return "Running";
          if (key === "rp" || key === "repairable") return "Repairable";
          if (key === "us" || key === "unserviceable") return "Unserviceable";
          if (key === "w/o" || key === "w//o" || key === "write-off")
            return "Write-off";
          return value;
        };
        const normalizeDeployment = (value: string) => {
          const key = value.trim().toLowerCase();
          if (key === "ft" || key === "full-time" || key === "full time")
            return "Full-Time";
          if (key === "pt" || key === "part-time" || key === "part time")
            return "Part-Time";
          if (key === "rs" || key === "reserve") return "Reserve";
          if (key === "sp" || key === "surplus") return "Surplus";
          return value;
        };

        setIdNo(data["ID No."] ?? "");
        setModel(data["Maker,Model & Type"] ?? "");
        setCategory(data.Category ?? "PC");
        setCondition(data.Condition ? normalizeCondition(data.Condition) : "");
        setDeployment(
          data.Deployment ? normalizeDeployment(data.Deployment) : "",
        );
        setQuantity(Number(data.Quantity) || 0);
        setLocation(data.Location ?? "");
        setDate(data["Date Received"] ?? "");
        setDescription(data.Description ?? "");
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : String(err)),
      )
      .finally(() => setIsLoading(false));
  }, [isEditing, recordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!idNo.trim()) {
      setError("ID No. is required");
      return;
    }
    const payload: EquipmentPayload = {
      "ID No.": idNo.trim(),
      "Maker,Model & Type": model.trim(),
      Category: category,
      Condition: condition,
      Deployment: deployment,
      Quantity: quantity,
      Location: location.trim(),
      "Date Received": date,
      Description: description.trim() || undefined,
    };

    try {
      const res = await fetch(isEditing ? `${api}/${recordId}` : api, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save equipment");
      navigate("/equipments");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4 bg-background">
      <div className="max-w-3xl mx-auto bg-card text-card-foreground rounded shadow p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded border border-border bg-background hover:bg-accent/5"
            aria-label="Go back"
          >
            <MoveLeft />
          </button>

          <div>
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Equipment" : "Add Equipment"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditing
                ? "Update the equipment details."
                : "Fill in required details for the new equipment."}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="mb-4 text-sm text-muted-foreground">
            Loading equipment data...
          </div>
        )}
        {error && <div className="mb-4 text-sm text-destructive">{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label htmlFor="idNo" className="block text-sm mb-1">
              ID No. <span className="text-destructive">*</span>
            </label>
            <input
              id="idNo"
              name="idNo"
              aria-required
              className="w-full border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 rounded focus:border-ring"
              value={idNo}
              onChange={(e) => setIdNo(e.target.value)}
              placeholder="e.g. PC-01"
              required
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm mb-1">
              Maker, Model & Type
            </label>
            <input
              id="model"
              name="model"
              className="w-full border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 rounded focus:border-ring"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Computer (Core i5)"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <div>
              <label htmlFor="category" className="block text-sm mb-1">
                Category
              </label>
              <Category value={category} onChange={setCategory} />
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm mb-1">
                Condition
              </label>
              <Condition value={condition} onChange={setCondition} />
            </div>
            <div>
              <label htmlFor="deployment" className="block text-sm mb-1">
                Deployment
              </label>
              <Deployment value={deployment} onChange={setDeployment} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-2">
            <div>
              <label htmlFor="quantity" className="block text-sm mb-1">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={0}
                  step={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full text-center border border-border bg-input text-foreground srounded focus:border-ring py-2"
                  aria-label="Quantity"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                className="w-full border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 rounded focus:border-ring"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Software Lab"
              />
            </div>

            <div>
              <label htmlFor="dateReceived" className="block text-sm mb-1">
                Date Received
              </label>
              <input
                id="dateReceived"
                name="dateReceived"
                type="date"
                className="w-full border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 rounded focus:border-ring"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full h-24 border border-border bg-input text-foreground placeholder:text-muted-foreground px-3 py-2 rounded focus:border-ring"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="col-span-2 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/equipments")}
              className="px-4 py-2 rounded border border-border bg-background hover:bg-accent/5 w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-primary-foreground w-full sm:w-auto"
            >
              {isEditing ? "Update Equipment" : "Add Equipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
