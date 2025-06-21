"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sala } from "@/lib/types";
import {
  fetchSalas,
  cadastrarSala,
  editarSala,
  excluirSala,
} from "@/lib/api/salas";

const API_URL = process.env.NEXT_PUBLIC_SALAS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_SALAS_URL não está definida."
  );
}

export function useSalas() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSalas();
      setSalas(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar salas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (sala: Partial<Sala>) => {
    try {
      await cadastrarSala(sala);
      toast.success("Sala cadastrada com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar sala");
    }
  };

  const editar = async (id: number, sala: Sala) => {
    try {
      await editarSala(id, sala);
      toast.success("Sala editada com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar sala");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirSala(id);
      toast.success("Sala excluida com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir sala");
    }
  };

  return {
    salas,
    loading,
    error,
    cadastrarSala: cadastrar,
    editarSala: editar,
    excluirSala: excluir,
    refetch: fetchSalas,
  };
}
