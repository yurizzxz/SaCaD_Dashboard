"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Disciplina } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_DISCIPLINAS_URL;

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
      console.log("Dados da API:", data); 

      const allDisciplinas = data.flatMap(
        (curso: { disciplinas: Disciplina[] }) => curso.disciplinas
      );
      console.log("Disciplinas extraídas:", allDisciplinas); 

      setDisciplinas(allDisciplinas);
    } catch (err) {
      console.error("Erro ao buscar disciplinas:", err); 
      setError("Erro ao buscar disciplinas");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarDisciplina = async (
    novoCursoId: number,
    novaDisciplina: Partial<Disciplina>
  ) => {
    try {
      const res = await fetch(API_URL!, {
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
      console.error("Erro ao cadastrar disciplina:", err);
      setError("Erro ao cadastrar disciplina");
    }
  };

  const editarDisciplina = async (
    cursoId: number,
    disciplinaId: number,
    disciplinaAtualizada: Partial<Disciplina>
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/${cursoId}/${disciplinaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(disciplinaAtualizada),
        }
      );
      if (!res.ok) throw new Error("Erro ao editar disciplina");

      toast.success("Disciplina editada com sucesso!");
      await fetchDisciplinas();
    } catch (err) {
      console.error("Erro ao editar disciplina:", err); 
      setError("Erro ao editar disciplina");
    }
  };

  const excluirDisciplina = async (cursoId: number, disciplinaId: number) => {
    try {
      const res = await fetch(
        `${API_URL}/${cursoId}/${disciplinaId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Erro ao excluir disciplina");

      toast.success("Disciplina excluída com sucesso!");
      await fetchDisciplinas();
    } catch (err) {
      console.error("Erro ao excluir disciplina:", err);
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
