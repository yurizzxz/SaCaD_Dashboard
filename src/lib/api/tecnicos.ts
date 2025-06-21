import { Tecnico } from "../../types/types";

const API_URL = process.env.NEXT_PUBLIC_TECNICOS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_TECNICOS_URL não está definida."
  );
}

export async function fetchTecnicos(): Promise<Tecnico[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar técnicos");
  return await res.json();
}

export async function cadastrarTecnico(tecnico: Partial<Tecnico>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tecnico),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar técnico");
}

export async function editarTecnico(id: number, tecnico: Partial<Tecnico>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tecnico),
  });
  if (!res.ok) throw new Error("Erro ao editar técnico");
}

export async function excluirTecnico(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir técnico");
}
