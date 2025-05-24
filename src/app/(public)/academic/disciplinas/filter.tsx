"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CursoSelect } from "@/components/select/curso-select";
import { useEffect, useState } from "react";
import { Disciplina } from "@/lib/types";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;

  modalidadeSelecionada: string;
  onModalidadeChange: (modalidade: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
  modalidadeSelecionada,
  onModalidadeChange,
}: FilterSelectProps) {
  const [modalidade, setModalidade] = useState<Disciplina[]>([]);

  useEffect(() => {
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Disciplina[]) => setModalidade(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  return (
    <div className="flex gap-2 flex-wrap mt-4 lg:mt-0">
      {" "}
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
      <Select value={modalidadeSelecionada} onValueChange={onModalidadeChange}>
        <SelectTrigger className="w-[210px]">
          <SelectValue placeholder="Filtrar por Modalidade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={"todos"} value="todos">
            Modalidades
          </SelectItem>
          <SelectItem key={"EAD"} value="EAD">
            EAD
          </SelectItem>
          <SelectItem key={"Presencial"} value="Presencial">
            Presencial
          </SelectItem>
          <SelectItem key={"Híbrido"} value="Híbrido">
            Híbrido
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
