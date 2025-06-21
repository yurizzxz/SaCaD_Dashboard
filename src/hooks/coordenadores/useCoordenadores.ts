"use client";

import { useEffect, useState } from "react";
import { Coordenador } from "@/lib/types";
import { toast } from "sonner";
import {
  cadastrarCoordenador,
  editarCoordenador,
  excluirCoordenador,
  fetchCoordenadores,
} from "@/lib/api/coordenadores";

export function useCoordenadores() {
  const [coordenadores, setCoordenadores] = useState<Coordenador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCoordenadores();
      setCoordenadores(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar coordenadores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (novoCoordenador: Partial<Coordenador>) => {
    try {
      await cadastrarCoordenador(novoCoordenador);
      toast.success("Coordenador cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar coordenador");
    }
  };

  const editar = async (id: number, dados: Partial<Coordenador>) => {
    try {
      await editarCoordenador(id, dados);
      toast.success("Coordenador editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar coordenador");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirCoordenador(id);
      toast.success("Coordenador excluído com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir coordenador");
    }
  };

  return {
    coordenadores,
    loading,
    error,
    cadastrarCoordenador: cadastrar,
    editarCoordenador: editar,
    excluirCoordenador: excluir,
    refetch: load,
  };
}
