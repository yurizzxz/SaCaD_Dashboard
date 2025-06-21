import { z } from "zod";

export const professorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  data_admissao: z.string().min(1, "Data de admissão é obrigatória"),
  status: z.string().min(1, "Status é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  curso_id: z.array(z.string()).nonempty("Selecione pelo menos um curso"),
  disciplinas_id: z.array(z.string()).nonempty("Disciplina é obrigatória"),
});
