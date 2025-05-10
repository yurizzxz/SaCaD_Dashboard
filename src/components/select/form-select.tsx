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

// ---------- DISCIPLINA ----------
interface DisciplinaSelectProps {
  disciplinaSelecionada: string;
  onDisciplinaChange: (disciplinaId: string) => void;
  className?: string;
}

export function FormDisciplinaSelect({
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

  const disciplinaAtual = disciplinas.find(
    (disciplina) => disciplina.id.toString() === disciplinaSelecionada
  );

  return (
    <Select value={disciplinaSelecionada} onValueChange={onDisciplinaChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Selecione uma disciplina">
          {disciplinaAtual ? disciplinaAtual.nome : "Selecione uma disciplina"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos as disciplinas</SelectItem>
        {disciplinas.map((disciplina) => (
          <SelectItem key={disciplina.id} value={disciplina.id.toString()}>
            {disciplina.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
