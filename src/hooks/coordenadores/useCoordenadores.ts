'use client';

import { useEffect, useState } from "react";
import { Coordenador } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_COORDENADORES_URL;

export function useCoordenadores() {
  const [coordenadores, setCoordenadores] = useState<Coordenador[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoordenadores();
  }, []);

  const fetchCoordenadores = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar coordenadores");

      const data: Coordenador[] = await res.json();
      setCoordenadores(data);
    } catch (err) {
      setError("Erro ao buscar coordenadores");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarCoordenador = async (novoCoordenador: Partial<Coordenador>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCoordenador),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar coordenador");

      toast.success("Coordenador cadastrado com sucesso!");

      await fetchCoordenadores();
    } catch (err) {
      setError("Erro ao cadastrar coordenador");
    }
  };

  const editarCoordenador = async (id: number, coordenadorAtualizado: Partial<Coordenador>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coordenadorAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar coordenador");

      toast.success("Coordenador editado com sucesso!");

      await fetchCoordenadores();
    } catch (err) {
      setError("Erro ao editar coordenador");
    }
  };

  const excluirCoordenador = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir coordenador");

      toast.success("Coordenador excluído com sucesso!");

      await fetchCoordenadores();
    } catch (err) {
      setError("Erro ao excluir coordenador");
    }
  };

  return {
    coordenadores,
    loading,
    error,
    cadastrarCoordenador,
    editarCoordenador,
    excluirCoordenador,
    refetch: fetchCoordenadores,
  };
}
