import { Disciplina } from "../types";

const API_URL = process.env.NEXT_PUBLIC_DISCIPLINAS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_DISCIPLINAS_URL não está definida."
  );
}

export async function fetchDisciplinas(): Promise<Disciplina[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar disciplinas");
  return await res.json();
}

export async function cadastrarDisciplina(disciplina: Partial<Disciplina>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(disciplina),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar disciplina");
}

export async function editarDisciplina(
  id: number,
  disciplina: Partial<Disciplina>
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(disciplina),
  });
  if (!res.ok) throw new Error("Erro ao editar disciplina");
}

export async function excluirDisciplina(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir disciplina");
}
