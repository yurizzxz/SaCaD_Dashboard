import { Coordenador } from "../../types/types";

const API_URL = process.env.NEXT_PUBLIC_COORDENADORES_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_COORDENADORES_URL não está definida.");
}

export async function fetchCoordenadores(): Promise<Coordenador[]> {
  const res = await fetch(API_URL!);
  if (!res.ok) throw new Error("Erro ao buscar coordenadores");
  return await res.json();
}

export async function cadastrarCoordenador(coordenador: Partial<Coordenador>) {
  const res = await fetch(API_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coordenador),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar coordenador");
}

export async function editarCoordenador(
  id: number,
  coordenador: Partial<Coordenador>
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coordenador),
  });
  if (!res.ok) throw new Error("Erro ao editar coordenador");
}

export async function excluirCoordenador(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir coordenador");
}
