"use client";

import { useEffect, useState } from "react";
import { Professor } from "@/types/types";
import { toast } from "sonner";
import {
  cadastrarProfessor,
  editarProfessor,
  excluirProfessor,
  fetchProfessores,
} from "@/lib/api/teachers";

const API_URL = process.env.NEXT_PUBLIC_TEACHERS_URL;

export function useTeachers() {
  const [teachers, setTeachers] = useState<Professor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProfessores();
      setTeachers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar professores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (professor: Partial<Professor>) => {
    try {
      await cadastrarProfessor(professor);
      toast.success("Professor cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar professor");
    }
  };

  const editar = async (id: number, professor: Professor) => {
    try {
      await editarProfessor(id, professor);
      toast.success("Professor editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar professor");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirProfessor(id);
      toast.success("Professor excluido com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir professor");
    }
  };

  return {
    teachers,
    loading,
    error,
    cadastrarTeacher: cadastrar,
    editarTeacher: editar,
    excluirTeacher: excluir,
    refetch: fetchProfessores,
  };
}
