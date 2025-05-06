import { useEffect, useState } from "react";
import { Curso } from "@/lib/types";

export function useCoursesFilter() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const getNomeCurso = (id: string) =>
    cursos.find((c) => c.id === Number(id))?.nome_curso || "Não encontrado";

  const getIdCurso = (nome: string) =>
    cursos.find((curso) => curso.nome_curso === nome)?.id;

  return { cursos, getNomeCurso, getIdCurso };
}
