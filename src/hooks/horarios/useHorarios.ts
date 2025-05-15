'use client';

import { useEffect, useState } from "react";
import { Horario } from "@/lib/types";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_HORARIOS_URL;

export function useHorarios() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL!);
      if (!res.ok) throw new Error("Erro ao buscar horários");

      const data: Horario[] = await res.json();
      setHorarios(data);
    } catch (err) {
      setError("Erro ao buscar horários");
    } finally {
      setLoading(false);
    }
  };

  const cadastrarHorario = async (novoHorario: Partial<Horario>) => {
    try {
      const res = await fetch(API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoHorario),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar horário");

      toast.success("Horário cadastrado com sucesso!");
      await fetchHorarios();
    } catch (err) {
      setError("Erro ao cadastrar horário");
    }
  };

  const editarHorario = async (id: number, horarioAtualizado: Partial<Horario>) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(horarioAtualizado),
      });
      if (!res.ok) throw new Error("Erro ao editar horário");

      toast.success("Horário editado com sucesso!");
      await fetchHorarios();
    } catch (err) {
      setError("Erro ao editar horário");
    }
  };

  const excluirHorario = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir horário");

      toast.success("Horário excluído com sucesso!");
      await fetchHorarios();
    } catch (err) {
      setError("Erro ao excluir horário");
    }
  };

  return {
    horarios,
    loading,
    error,
    cadastrarHorario,
    editarHorario,
    excluirHorario,
    refetch: fetchHorarios,
  };
}
