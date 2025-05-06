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
import { Professor } from "@/lib/types";
import { useEffect, useState } from "react";

interface FilterSelectProps {
  cursoSelecionado?: string;
  onCursoChange?: (curso: string) => void;

  disciplinaSelecionada?: string;
  onDisciplinaChange?: (disciplina: string) => void;

  statusSelecionado?: string;
  onStatusChange?: (status: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
  disciplinaSelecionada,
  onDisciplinaChange,
  statusSelecionado,
  onStatusChange,
}: FilterSelectProps) {

  const [professores, setProfessores] = useState<Professor[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Professor[]) => setProfessores(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  return (
    <div className="flex gap-2 flex-wrap mt-4 lg:mt-0">
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

      <Select value={statusSelecionado} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"todos"} value="todos">Todos</SelectItem>
          <SelectItem key={"Ativo"} value="Ativo">Ativo</SelectItem>
          <SelectItem key={"Afastado"} value="Afastado">Afastado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
