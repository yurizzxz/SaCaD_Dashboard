'use client';

import { useEffect, useState } from "react";
import { Aluno } from "@/lib/types";


export function useAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch("http://localhost:99/alunos");
        if (!res.ok) throw new Error("Erro ao buscar alunos");

        const data: Aluno[] = await res.json();
        setAlunos(data);
      } catch (err) {
        setError("Erro ao buscar alunos");
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  return { alunos, loading, error };
}
