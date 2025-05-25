"use client";
import { CursoSelect } from "@/components/select/curso-select";
interface FilterSelectProps {
  cursoSelecionado: string;
  onCursoChange: (curso: string) => void;
}

export function FilterSelect({
  cursoSelecionado,
  onCursoChange,
}: FilterSelectProps) {
  return (
    <div className="flex gap-2 flex-wrap mt-0">
      <CursoSelect
        cursoSelecionado={cursoSelecionado}
        onCursoChange={onCursoChange}
      />
    </div>
  );
}
