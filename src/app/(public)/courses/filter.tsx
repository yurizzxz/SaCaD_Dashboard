"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Curso } from "@/lib/types";
import { useEffect, useState } from "react";

interface EixoSelectProps {
  eixoSelecionado: string;
  onEixoChange: (curso: string) => void;
}

export function FilterSelect({
  eixoSelecionado,
  onEixoChange,
}: EixoSelectProps) {
  const [eixo, setEixo] = useState<Curso[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setEixo(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  return (
    <div className="flex gap-2 flex-wrap mt-4 lg:mt-0">
      <Select value={eixoSelecionado} onValueChange={onEixoChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Eixo Tecnológico" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"todos"} value="todos">
            Todos os eixos
          </SelectItem>
          <SelectItem key={"Gestão"} value="Gestão">
            Gestão
          </SelectItem>
          <SelectItem key={"Tecnologia"} value="Tecnologia">
            Tecnologia
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
