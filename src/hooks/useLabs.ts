'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_LABS_URL;

export function useLabs() {
  const [labs, setLabs] = useState<any[]>([]);
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
    } catch (err) {
      setError("Erro ao buscar laboratórios");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarLab = async (novoLab: Partial<any>) => {
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
    } catch (err) {
      setError("Erro ao cadastrar laboratório");
    }
  };

  const editarLab = async (id: number, labAtualizado: Partial<any>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(labAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar laboratório");

      toast.success("Laboratório editado com sucesso!");

      await fetchLabs();
    } catch (err) {
      setError("Erro ao editar laboratório");
    }
  };

  const excluirLab = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir laboratório");

      await fetchLabs();
    } catch (err) {
      setError("Erro ao excluir laboratório");
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
