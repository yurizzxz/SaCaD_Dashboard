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
      const res = await fetch(`${API_URL}`);
      if (!res.ok) throw new Error("Erro ao buscar Disciplinas");

      const data: Disciplina[] = await res.json();
      setDisciplinas(data);
    } catch (err) {
      setError("Erro ao buscar Disciplinas");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarDisciplina = async (novoLab: Partial<Disciplina>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLab),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar disciplina");

      toast.success("Disciplina cadastrado com sucesso!");

      await fetchDisciplinas();
    } catch (err) {
      setError("Erro ao cadastrar disciplina");
    }
  };

  const editarDisciplina = async (
    id: number,
    labAtualizado: Partial<Disciplina>
  ) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(labAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar disciplina");

      toast.success("Disciplina editada com sucesso!");

      await fetchDisciplinas();
    } catch (err) {
      setError("Erro ao editar disciplina");
    }
  };

  const excluirDisciplina = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir disciplina");

      toast.success("Disciplina excluída com sucesso!");

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
