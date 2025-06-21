"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tecnico } from "@/types/types";
import { useEffect, useState } from "react";

interface FilterSelectProps {
  statusSelecionado: string;
  onStatusChange: (status: string) => void;
}

export function FilterSelect({
  statusSelecionado,
  onStatusChange,
}: FilterSelectProps) {
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("http://localhost:99/tecnicos");
        const data: Tecnico[] = await res.json();

        const statusTecnico = Array.from(new Set(data.map(tecnico => tecnico.status)));
        setStatus(statusTecnico);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    }

    fetchStatus();
  });

  return (
    <div className="flex gap-2 flex-wrap lg:mt-0">
      <Select value={statusSelecionado} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Status</SelectItem>
          <SelectItem value="Ativo">Ativo</SelectItem>
          <SelectItem value="Afastado">Afastado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
