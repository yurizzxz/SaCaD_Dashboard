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
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Prédio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Predio A">Predio A</SelectItem>
          <SelectItem value="Predio B">Predio B</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Bloco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Bloco 1">Bloco A</SelectItem>
          <SelectItem value="Bloco 2">Bloco B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
