import { Professor } from "../../types/types";

const API_URL = process.env.NEXT_PUBLIC_TEACHERS_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_TEACHERS_URL não está definida.");
}

export async function fetchProfessores(): Promise<Professor[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar professores");
  return await res.json();
}

export async function cadastrarProfessor(professor: Partial<Professor>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(professor),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar professor");
}

export async function editarProfessor(
  id: number,
  professor: Partial<Professor>
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(professor),
  });
  if (!res.ok) throw new Error("Erro ao editar professor");
}

export async function excluirProfessor(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao excluir professor");
}
