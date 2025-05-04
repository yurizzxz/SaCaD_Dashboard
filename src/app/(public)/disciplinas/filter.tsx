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
          <SelectValue placeholder="Filtrar por Curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Engenharia da Computação">Engenharia</SelectItem>
          <SelectItem value="Administração de Empresas">Administração</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[210px]">
          <SelectValue placeholder="Filtrar por Modalidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="EAD">EAD</SelectItem>
          <SelectItem value="Presencial">Presencial</SelectItem>
          <SelectItem value="Híbrido">Híbrido</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
