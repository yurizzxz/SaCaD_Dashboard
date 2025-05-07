"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Curso } from "@/lib/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CursoSelectProps {
  cursoSelecionado: string; 
  onCursoChange: (cursoId: string) => void;
  className?: string;
}

export function FormCursoSelect({
  cursoSelecionado,
  onCursoChange,
  className,
}: CursoSelectProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const cursoAtual = cursos.find((curso) => curso.id.toString() === cursoSelecionado);

  return (
    <Select value={cursoSelecionado} onValueChange={onCursoChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Filtrar por Curso">
          {cursoAtual ? cursoAtual.nome_curso : "Filtrar por Curso"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos os cursos</SelectItem>
        {cursos.map((curso) => (
          <SelectItem key={curso.id} value={curso.id.toString()}>
            {curso.nome_curso}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
