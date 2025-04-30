'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_CURSOS_URL;

interface Disciplina {
  id: number;
  nome: string;
  aulas_teoricas: number;
  aulas_praticas: number;
}

export function useDisciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const fetchDisciplinas = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar cursos");

      const data = await res.json();
      const allDisciplinas = data.flatMap((curso: { disciplinas: Disciplina[] }) => curso.disciplinas);
      setDisciplinas(allDisciplinas);
    } catch (err) {
      setError("Erro ao buscar disciplinas");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarDisciplina = async (novoCursoId: number, novaDisciplina: Partial<Disciplina>) => {
    try {
      const res = await fetch(`${API_URL}/${novoCursoId}/disciplinas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaDisciplina),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar disciplina");

      toast.success("Disciplina cadastrada com sucesso!");
      await fetchDisciplinas();
    } catch (err) {
      setError("Erro ao cadastrar disciplina");
    }
  };

  const editarDisciplina = async (cursoId: number, disciplinaId: number, disciplinaAtualizada: Partial<Disciplina>) => {
    try {
      const res = await fetch(`${API_URL}/${cursoId}/disciplinas/${disciplinaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(disciplinaAtualizada),
      });
      if (!res.ok) throw new Error("Erro ao editar disciplina");

      toast.success("Disciplina editada com sucesso!");
      await fetchDisciplinas();
    } catch (err) {
      setError("Erro ao editar disciplina");
    }
  };

  const excluirDisciplina = async (cursoId: number, disciplinaId: number) => {
    try {
      const res = await fetch(`${API_URL}/${cursoId}/disciplinas/${disciplinaId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir disciplina");

      await fetchDisciplinas();
    } catch (err) {
      setError("Erro ao excluir disciplina");
    }
  };

  return {
    disciplinas,
    loading,
    error,
    cadastrarDisciplina,
    editarDisciplina,
    excluirDisciplina,
    refetch: fetchDisciplinas,
  };
}
