import { Curso } from "../types";

const API_URL = process.env.NEXT_PUBLIC_CURSOS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_CURSOS_URL não está definida."
  );
}

export async function fetchCursos(): Promise<Curso[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar cursos");
  return await res.json();
}

export async function cadastrarCurso(curso: Partial<Curso>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar curso");
}

export async function editarCurso(id: number, curso: Partial<Curso>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
  if (!res.ok) throw new Error("Erro ao editar curso");
}

export async function excluirCurso(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir curso");
}
