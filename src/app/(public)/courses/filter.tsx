"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FilterSelect() {
  return (
    <div className="flex gap-2">
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Eixo Tecnológico" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Gestão">Gestão</SelectItem>
          <SelectItem value="Tecnologia">Tecnologia</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
