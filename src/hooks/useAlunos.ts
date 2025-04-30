'use client';

import { useEffect, useState } from "react";
import { Aluno } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_ALUNOS_URL;

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar alunos");

      const data: Aluno[] = await res.json();
      setAlunos(data);
    } catch (err) {
      setError("Erro ao buscar alunos");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarAluno = async (novoAluno: Partial<Aluno>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoAluno),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar aluno");

      await fetchAlunos();
    } catch (err) {
      setError("Erro ao cadastrar aluno");
    }
  };

  const editarAluno = async (id: number, alunoAtualizado: Partial<Aluno>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alunoAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar aluno");

      await fetchAlunos();
    } catch (err) {
      setError("Erro ao editar aluno");
    }
  };

  const excluirAluno = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir aluno");

      await fetchAlunos();
    } catch (err) {
      setError("Erro ao excluir aluno");
    }
  };

  return {
    alunos,
    loading,
    error,
    cadastrarAluno,
    editarAluno,
    excluirAluno,
    refetch: fetchAlunos,
  };
}
