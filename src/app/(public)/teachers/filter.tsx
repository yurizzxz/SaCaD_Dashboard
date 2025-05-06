"use client";
import { CursoSelect } from "@/components/curso-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Curso } from "@/lib/types";
import { useEffect, useState } from "react";

interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
}: FilterSelectProps) {

  return (
    <div className="flex gap-2">
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />

      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filtrar por Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Afastado">Afastado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
