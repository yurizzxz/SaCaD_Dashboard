"use client";

import { useEffect, useState } from "react";
import { Professor } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_TEACHERS_URL;

export function useTeachers() {
  const [teachers, setTeachers] = useState<Professor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar professores");

      const data: Professor[] = await res.json();
      setTeachers(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarTeacher = async (novoTeacher: Partial<Professor>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoTeacher),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar professor");

      toast.success("Professor cadastrado com sucesso!");

      await fetchTeachers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const editarTeacher = async (
    id: number,
    teacherAtualizado: Partial<Professor>
  ) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar professor");

      toast.success("Professor editado com sucesso!");

      await fetchTeachers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  const excluirTeacher = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir professor");

      toast.success("Professor excluído com sucesso!");

      await fetchTeachers();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
    }
  };

  return {
    teachers,
    loading,
    error,
    cadastrarTeacher,
    editarTeacher,
    excluirTeacher,
    refetch: fetchTeachers,
  };
}
