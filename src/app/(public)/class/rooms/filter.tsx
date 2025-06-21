"use client";
import { useEffect, useState } from "react";
import { CursoSelect } from "@/components/select/curso-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Laboratorio } from "@/types/types";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
  predioSelecionado: string;
  onPredioChange: (predio: string) => void;
  blocoSelecionado: string;
  onBlocoChange: (bloco: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
  predioSelecionado,
  onPredioChange,
  blocoSelecionado,
  onBlocoChange,
}: FilterSelectProps) {
  const [predios, setPredios] = useState<string[]>([]);
  const [blocos, setBlocos] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const res = await fetch("http://localhost:99/salas");
        const data: Laboratorio[] = await res.json();

        const prediosUnicos = Array.from(new Set(data.map(lab => lab.predio)));
        const blocosUnicos = Array.from(new Set(data.map(lab => lab.bloco)));

        setPredios(prediosUnicos);
        setBlocos(blocosUnicos);
      } catch (error) {
        console.error("Erro ao buscar laboratórios:", error);
      }
    }

    fetchSalas();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
      <Select value={predioSelecionado} onValueChange={onPredioChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Prédio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Prédio</SelectItem>
          {predios.map((predio, index) => (
            <SelectItem key={index} value={predio}>
              Prédio {predio}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={blocoSelecionado} onValueChange={onBlocoChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue  placeholder="Filtrar por Bloco" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Bloco</SelectItem>
          {blocos.map((bloco, index) => (
            <SelectItem key={index} value={bloco}>
              Bloco {bloco}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}