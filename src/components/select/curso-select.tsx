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
  onCursoChange: (curso: string) => void;
  className?: string; 
}

export function CursoSelect({
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

  return (
    <Select value={cursoSelecionado} onValueChange={onCursoChange}>
      <SelectTrigger className={twMerge("w-[230px]", className)}>
        <SelectValue placeholder="Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Curso</SelectItem>
        {cursos.map((curso) => (
          <SelectItem key={curso.id} value={curso.nome_curso}>
            {curso.nome_curso}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
