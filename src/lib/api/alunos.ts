import { Aluno } from "../types";

const API_URL = process.env.NEXT_PUBLIC_ALUNOS_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_ALUNOS_URL não está definida.");
}

export async function fetchAlunos(): Promise<Aluno[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar alunos");
  return await res.json();
}

export async function cadastrarAluno(aluno: Partial<Aluno>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar aluno");
}

export async function editarAluno(id: number, aluno: Partial<Aluno>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aluno),
  });
  if (!res.ok) throw new Error("Erro ao editar aluno");
  return await res.json();
}

export async function excluirAluno(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir aluno");
}
