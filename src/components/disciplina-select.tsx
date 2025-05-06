"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Disciplina } from "@/lib/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DisciplinaSelectProps {
  disciplinaSelecionada: string;
  onDisciplinaChange: (curso: string) => void;
  className?: string;
}

export function DisciplinaSelect({
  disciplinaSelecionada,
  onDisciplinaChange,
  className,
}: DisciplinaSelectProps) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Disciplina[]) => setDisciplinas(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  return (
    <Select value={disciplinaSelecionada} onValueChange={onDisciplinaChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Filtrar por Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos</SelectItem>
        {disciplinas.map((disciplina) => (
          <SelectItem key={disciplina.id} value={disciplina.nome}>
            {disciplina.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
