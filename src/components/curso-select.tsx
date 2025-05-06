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

interface CursoSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

export function CursoSelect({ cursoSelecionado, onCursoChange }: CursoSelectProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  return (
    <Select value={cursoSelecionado} onValueChange={onCursoChange}>
      <SelectTrigger className="w-[230px]">
        <SelectValue placeholder="Filtrar por Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="todos">Todos</SelectItem>
        {cursos.map((curso) => (
          <SelectItem key={curso.id} value={curso.nome_curso}>
            {curso.nome_curso}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
