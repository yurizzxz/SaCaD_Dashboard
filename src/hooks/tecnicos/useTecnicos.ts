"use client";

import { useEffect, useState } from "react";
import { Tecnico } from "@/lib/types";
import { toast } from "sonner";
import {
  cadastrarTecnico,
  editarTecnico,
  excluirTecnico,
  fetchTecnicos,
} from "@/lib/api/tecnicos";

export function useTecnicos() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchTecnicos();
      setTecnicos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar tecnicos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (tecnicos: Partial<Tecnico>) => {
    try {
      await cadastrarTecnico(tecnicos);
      toast.success("Tecnico cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar tecnico");
    }
  };

  const editar = async (id: number, tecnicos: Partial<Tecnico>) => {
    try {
      await editarTecnico(id, tecnicos);
      toast.success("Tecnico editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar tecnico");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirTecnico(id);
      toast.success("Tecnico excluido com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir tecnico");
    }
  };

  return {
    tecnicos,
    loading,
    error,
    cadastrarTecnico: cadastrar,
    editarTecnico: editar,
    excluirTecnico: excluir,
    refetch: fetchTecnicos,
  };
}
