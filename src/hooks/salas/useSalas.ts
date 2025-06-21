"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sala } from "@/lib/types";

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

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}`);
      if (!res.ok) throw new Error("Erro ao buscar salas");

      const data: Sala[] = await res.json();
      setSalas(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarSala = async (novaSala: Partial<Sala>) => {
    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaSala),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar sala");

      toast.success("Sala cadastrada com sucesso!");

      await fetchSalas();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const editarSala = async (id: number, salaAtualizada: Partial<Sala>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salaAtualizada),
      });
      if (!res.ok) throw new Error("Erro ao editar sala");

      toast.success("Sala editada com sucesso!");

      await fetchSalas();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const excluirSala = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir sala");

      toast.success("Sala excluida com sucesso!");

      await fetchSalas();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  return {
    salas,
    loading,
    error,
    cadastrarSala,
    editarSala,
    excluirSala,
    refetch: fetchSalas,
  };
}
