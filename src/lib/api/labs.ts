import { Laboratorio } from "../../types/types";

const API_URL = process.env.NEXT_PUBLIC_LABS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_LABS_URL não está definida."
  );
}

export async function fetchLabs(): Promise<Laboratorio[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar laboratórios");
  return await res.json();
}

export async function cadastrarLab(lab: Partial<Laboratorio>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lab),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar laboratório");
}

export async function editarLab(id: number, lab: Partial<Laboratorio>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lab),
  });
  if (!res.ok) throw new Error("Erro ao editar laboratório");
}

export async function excluirLab(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir laboratório");
}
