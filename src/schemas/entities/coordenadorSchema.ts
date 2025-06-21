import { z } from "zod";

export const coordenadorSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone obrigatório"),
  curso_id: z.array(z.number()).min(1, "Selecione ao menos um curso"),
});
