"use client";

import { useEffect, useState } from "react";
import { Curso } from "@/types/types";
import { toast } from "sonner";
import {
  fetchCursos,
  cadastrarCurso,
  editarCurso,
  excluirCurso,
} from "@/lib/api/courses";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCursos();
      setCursos(data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (novoCurso: Partial<Curso>) => {
    try {
      await cadastrarCurso(novoCurso);
      toast.success("Curso cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar curso");
    }
  };

  const editar = async (id: number, dados: Partial<Curso>) => {
    try {
      await editarCurso(id, dados);
      toast.success("Curso editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar curso");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirCurso(id);
      toast.success("Curso excluído com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir curso");
    }
  };

  return {
    cursos,
    loading,
    error,
    cadastrarCurso: cadastrar,
    editarCurso: editar,
    excluirCurso: excluir,
    refetch: fetchCursos,
  };
}
