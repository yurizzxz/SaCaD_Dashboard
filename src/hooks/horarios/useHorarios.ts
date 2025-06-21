'use client';

import { useEffect, useState } from "react";
import { Horario } from "@/lib/types";
import {
  fetchHorarios,
  criarHorario,
  editarHorario,
  excluirHorario,
} from "@/lib/api/horarios";
import { toast } from "sonner";

export function useHorarios() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchHorarios();
      setHorarios(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar horários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (novoHorario: Partial<Horario>) => {
    try {
      await criarHorario(novoHorario);
      toast.success("Horário cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar horário");
    }
  };

  const editar = async (id: number, dados: Partial<Horario>) => {
    try {
      await editarHorario(id, dados);
      toast.success("Horário editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar horário");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirHorario(id);
      toast.success("Horário excluído com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir horário");
    }
  };

  return {
    horarios,
    loading,
    error,
    cadastrarHorario: cadastrar,
    editarHorario: editar,
    excluirHorario: excluir,
    refetch: load,
  };
}
