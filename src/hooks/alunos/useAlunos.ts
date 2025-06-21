"use client";

import { useEffect, useState } from "react";
import { Aluno } from "@/types/types";
import { toast } from "sonner";
import {
  fetchAlunos,
  cadastrarAluno,
  editarAluno,
  excluirAluno,
} from "@/lib/api/alunos";

export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAlunos();
      setAlunos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar alunos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (novoAluno: Partial<Aluno>) => {
    try {
      await cadastrarAluno(novoAluno);
      toast.success("Aluno cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar aluno");
    }
  };

  const editar = async (id: number, dados: Partial<Aluno>) => {
    try {
      await editarAluno(id, dados);
      toast.success("Aluno editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar aluno");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirAluno(id);
      toast.success("Aluno excluído com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir aluno");
    }
  };
  return {
    alunos,
    loading,
    error,
    cadastrarAluno: cadastrar,
    editarAluno: editar,
    excluirAluno: excluir,
    refetch: load,
  };
}
