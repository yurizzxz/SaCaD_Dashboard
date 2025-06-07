import { z } from "zod";

export const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  curso_id: z.array(z.number()).min(1, "Selecione ao menos um curso"),
  status: z.string().min(1, "Status é obrigatório"),
  semestre: z.string().min(1, "Semestre é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  endereco: z.string().min(1, "Endereço é obrigatório"),
  data_nascimento: z.string().min(1, "Data de nascimento obrigatória"),
  data_matricula: z.string().min(1, "Data de matrícula obrigatória"),
});
