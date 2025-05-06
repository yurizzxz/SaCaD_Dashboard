"use client";
import { CursoSelect } from "@/components/curso-select";
import { DisciplinaSelect } from "@/components/disciplina-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FilterSelectProps {
  cursoSelecionado?: string;
  onCursoChange?: (curso: string) => void;
  disciplinaSelecionada?: string;
  onDisciplinaChange?: (disciplina: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
  disciplinaSelecionada,
  onDisciplinaChange,
}: FilterSelectProps) {
  return (
    <div className="flex gap-2">
      {onCursoChange && (
        <CursoSelect
          cursoSelecionado={cursoSelecionado || ""}
          onCursoChange={onCursoChange}
        />
      )}

      {onDisciplinaChange && (
        <DisciplinaSelect
          disciplinaSelecionada={disciplinaSelecionada || ""}
          onDisciplinaChange={onDisciplinaChange}
        />
      )}

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
