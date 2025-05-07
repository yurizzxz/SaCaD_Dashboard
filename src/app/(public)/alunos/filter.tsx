"use client";
import { CursoSelect } from "@/components/select/curso-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
}: FilterSelectProps) {
  return (
    <div className="flex gap-2 flex-wrap mt-4 lg:mt-0">
      {" "}
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Trancado">Trancado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
