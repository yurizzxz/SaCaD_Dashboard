"use client";
import { CursoSelect } from "@/components/select/curso-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Aluno } from "@/lib/types";
import { useEffect, useState } from "react";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
  statusSelecionado: string;
  onStatusChange: (status: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
  statusSelecionado,
  onStatusChange,
}: FilterSelectProps) {
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("http://localhost:99/alunos");
        const data: Aluno[] = await res.json();

        const statusAluno = Array.from(new Set(data.map(aluno => aluno.status)));
        setStatus(statusAluno);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    }

    fetchStatus();
  });

  return (
    <div className="flex gap-2 flex-wrap lg:mt-0">
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
      <Select value={statusSelecionado} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Status</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Trancado">Trancado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
