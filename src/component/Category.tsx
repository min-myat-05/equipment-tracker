import { useState } from "react";

type CategoryProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Category({ value, onChange }: CategoryProps) {
  const [localCategory, setLocalCategory] = useState("PC");
  const currentValue = value ?? localCategory;
  return (
    <div>
      <div>
        <select
          id="category"
          name="category"
          className="w-full border border-border bg-input text-foreground px-3 py-2 rounded focus:border-ring"
          value={currentValue}
          onChange={(event) => {
            const nextValue = event.target.value;
            setLocalCategory(nextValue);
            onChange?.(nextValue);
          }}
        >
          <option value={"PC"}>PC</option>
          <option value={"Digital Devices & Accessories"}>
            Digital Devices & Accessories
          </option>
          <option value={"Network Devices & Accessories"}>
            Network Devices & Accessories
          </option>
        </select>
      </div>
    </div>
  );
}
