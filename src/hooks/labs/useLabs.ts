"use client";

import { Laboratorio } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_LABS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_LABS_URL não está definida."
  );
}

export function useLabs() {
  const [labs, setLabs] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar laboratórios");

      const data = await res.json();
      setLabs(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarLab = async (novoLab: Partial<Laboratorio>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLab),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar laboratório");

      toast.success("Laboratório cadastrado com sucesso!");

      await fetchLabs();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const editarLab = async (id: number, labAtualizado: Partial<Laboratorio>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(labAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar laboratório");

      toast.success("Laboratório editado com sucesso!");

      await fetchLabs();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const excluirLab = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir laboratório");

      toast.success("Laboratório excluído com sucesso!");

      await fetchLabs();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  return {
    labs,
    loading,
    error,
    cadastrarLab,
    editarLab,
    excluirLab,
    refetch: fetchLabs,
  };
}
