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
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Afastado">Afastado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
