"use client";

import { useEffect, useState } from "react";
import { Tecnico } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_TECNICOS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_TECNICOS_URL não está definida."
  );
}

export function useTecnicos() {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTecnicos();
  }, []);

  const fetchTecnicos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar técnicos");

      const data: Tecnico[] = await res.json();
      setTecnicos(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarTecnico = async (novoTecnico: Partial<Tecnico>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoTecnico),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar técnico");

      toast.success("Técnico cadastrado com sucesso!");

      await fetchTecnicos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const editarTecnico = async (
    id: number,
    tecnicoAtualizado: Partial<Tecnico>
  ) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tecnicoAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar técnico");

      toast.success("Técnico editado com sucesso!");

      await fetchTecnicos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const excluirTecnico = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir técnico");

      toast.success("Técnico excluído com sucesso!");

      await fetchTecnicos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  return {
    tecnicos,
    loading,
    error,
    cadastrarTecnico,
    editarTecnico,
    excluirTecnico,
    refetch: fetchTecnicos,
  };
}
