"use client";

import { useEffect, useState } from "react";
import { Curso } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_CURSOS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_CURSOS_URL não está definida."
  );
}

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar cursos");

      const data: Curso[] = await res.json();
      setCursos(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarCurso = async (novoCurso: Partial<Curso>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCurso),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar curso");

      toast.success("Curso cadastrado com sucesso!");
      await fetchCursos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const editarCurso = async (id: number, cursoAtualizado: Partial<Curso>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cursoAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar curso");

      toast.success("Curso editado com sucesso!");
      await fetchCursos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const excluirCurso = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir curso");

      toast.success("Curso excluido com sucesso!");

      await fetchCursos();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  return {
    cursos,
    loading,
    error,
    cadastrarCurso,
    editarCurso,
    excluirCurso,
    refetch: fetchCursos,
  };
}
