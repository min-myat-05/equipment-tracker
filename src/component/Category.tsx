import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <Select
          value={currentValue}
          onValueChange={(value) => {
            setLocalCategory(value);
            onChange?.(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PC">PC</SelectItem>
            <SelectItem value="Digital Device">Digital Device</SelectItem>
            <SelectItem value="Network Device">Network Device</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
