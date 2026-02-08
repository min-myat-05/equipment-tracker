import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LaptopMinimal } from "lucide-react";

export function TotalCountCard({ data }: { data: any[] }) {
  const Total = data.length;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-col">
        <CardTitle>
          <LaptopMinimal />
        </CardTitle>
        <CardDescription className="text-[18px]">
          Total Equipments
        </CardDescription>
        <span className="text-lg font-semibold">{Total}</span>
      </CardHeader>
    </Card>
  );
}
