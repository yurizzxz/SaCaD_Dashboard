import { Horario } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_HORARIOS_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_HORARIOS_URL não está definida.");
}

export async function fetchHorarios(): Promise<Horario[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar horários");
  return await res.json();
}

export async function criarHorario(horario: Partial<Horario>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(horario),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar horário");
}

export async function editarHorario(id: number, horario: Partial<Horario>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(horario),
  });
  if (!res.ok) throw new Error("Erro ao editar horário");
}

export async function excluirHorario(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir horário");
}
