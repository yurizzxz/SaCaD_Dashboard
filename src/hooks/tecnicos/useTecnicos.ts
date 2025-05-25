'use client';

import { useEffect, useState } from "react";
import { Tecnico } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_TECNICOS_URL;

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
    } catch (err) {
      setError("Erro ao buscar técnicos");
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
    } catch (err) {
      setError("Erro ao cadastrar técnico");
    }
  };

  const editarTecnico = async (id: number, tecnicoAtualizado: Partial<Tecnico>) => {
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
    } catch (err) {
      setError("Erro ao editar técnico");
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
    } catch (err) {
      setError("Erro ao excluir técnico");
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
