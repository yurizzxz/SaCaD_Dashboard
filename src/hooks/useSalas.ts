'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Sala {
  id: number;
  nome_sala: string;
  capacidade: number;
  equipamentos: Record<string, number>;
}

const API_URL = process.env.NEXT_PUBLIC_SALAS_URL;

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
    } catch (err) {
      setError("Erro ao buscar salas");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarSala = async (novaSala: Partial<Sala>) => {
    try {
      const res = await fetch(`${API_URL}/salas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaSala),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar sala");

      toast.success("Sala cadastrada com sucesso!");

      await fetchSalas();
    } catch (err) {
      setError("Erro ao cadastrar sala");
    }
  };

  const editarSala = async (id: number, salaAtualizada: Partial<Sala>) => {
    try {
      const res = await fetch(`${API_URL}/salas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salaAtualizada),
      });
      if (!res.ok) throw new Error("Erro ao editar sala");

      toast.success("Sala editada com sucesso!");

      await fetchSalas();
    } catch (err) {
      setError("Erro ao editar sala");
    }
  };

  const excluirSala = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/salas/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir sala");

      await fetchSalas();
    } catch (err) {
      setError("Erro ao excluir sala");
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
