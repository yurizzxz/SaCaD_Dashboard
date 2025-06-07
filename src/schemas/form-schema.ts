import { z } from "zod";

// Entities Schemas
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

export const coordenadorSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone obrigatório"),
  curso_id: z.array(z.number()).min(1, "Selecione ao menos um curso"),
});

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

export const tecnicoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  setor: z.string().min(1, "Setor é obrigatório"),
  email: z.string().email("Email inválido"),
  status: z.string().min(1, "Status é obrigatório"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
});

// Class Schemas
