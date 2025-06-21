"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Disciplina } from "@/types/types";
import {
  fetchDisciplinas,
  cadastrarDisciplina,
  editarDisciplina,
  excluirDisciplina,
} from "@/lib/api/disciplina";

export function useDisciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchDisciplinas();
      setDisciplinas(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar disciplinas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (novaDisciplina: Partial<Disciplina>) => {
    try {
      await cadastrarDisciplina(novaDisciplina);
      toast.success("Disciplina cadastrada com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar disciplina");
    }
  };

  const editar = async (id: number, dados: Partial<Disciplina>) => {
    try {
      await editarDisciplina(id, dados);
      toast.success("Disciplina editada com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar disciplina");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirDisciplina(id);
      toast.success("Disciplina excluída com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir disciplina");
    }
  };

  return {
    disciplinas,
    loading,
    error,
    cadastrarDisciplina: cadastrar,
    editarDisciplina: editar,
    excluirDisciplina: excluir,
    refetch: fetchDisciplinas,
  };
}
