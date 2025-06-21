import { z } from "zod";

export const tecnicoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  setor: z.string().min(1, "Setor é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.string().min(1, "Status é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
});
