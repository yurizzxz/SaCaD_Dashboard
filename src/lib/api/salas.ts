import { Sala } from "../../types/types";

const API_URL = process.env.NEXT_PUBLIC_SALAS_URL;

if (!API_URL) {
  throw new Error(
    "A variável de ambiente NEXT_PUBLIC_SALAS_URL não está definida."
  );
}

export async function fetchSalas(): Promise<Sala[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar salas");
  return await res.json();
}

export async function cadastrarSala(sala: Partial<Sala>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sala),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar sala");
}

export async function editarSala(id: number, sala: Partial<Sala>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sala),
  });
  if (!res.ok) throw new Error("Erro ao editar sala");
}

export async function excluirSala(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir sala");
}
