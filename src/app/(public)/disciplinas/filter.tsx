"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CursoSelect } from "@/components/curso-select";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
}: FilterSelectProps) {
  return (
    <div className="flex gap-2">
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
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
