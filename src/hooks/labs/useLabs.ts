"use client";

import { fetchLabs, cadastrarLab, editarLab, excluirLab } from "@/lib/api/labs";
import { Laboratorio } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useLabs() {
  const [labs, setLabs] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchLabs();
      setLabs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar laboratórios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cadastrar = async (lab: Partial<Laboratorio>) => {
    try {
      await cadastrarLab(lab);
      toast.success("Laboratório cadastrado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar laboratório");
    }
  };

  const editar = async (id: number, lab: Laboratorio) => {
    try {
      await editarLab(id, lab);
      toast.success("Laboratório editado com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao editar laboratório");
    }
  };

  const excluir = async (id: number) => {
    try {
      await excluirLab(id);
      toast.success("Laboratório excluido com sucesso!");
      await load();
    } catch (err: any) {
      setError(err.message || "Erro ao excluir laboratório");
    }
  };

  return {
    labs,
    loading,
    error,
    cadastrarLab : cadastrar,
    editarLab : editar,
    excluirLab : excluir,
    refetch: fetchLabs,
  };
}
