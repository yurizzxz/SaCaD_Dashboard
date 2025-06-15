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

export const cursoSchema = z.object({
  nome_curso: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string().min(1, "Sigla é obrigatória"),
  area_tecnologica: z.string().min(1, "Area tecnológica é obrigatória"),
  modalidade: z.string().min(1, "Modalidade é obrigatória"),
  periodo: z.string().min(1, "Período é obrigatório"),
  duracao_em_semestres: z.string().min(1, "Duração é obrigatória"),
  email_coordenador: z.string().email("Email inválido"),
  forma_oferecimento: z.string().min(1, "Forma de oferta é obrigatória"),
});

export const disciplinaSchema = z.object({
  nome_disciplina: z.string().min(1, "Nome é obrigatório"),
  sigla: z.string().min(1, "Sigla é obrigatória"),
  area_tecnologica: z.string().min(1, "Area tecnológica é obrigatória"),
  modalidade: z.string().min(1, "Modalidade é obrigatória"),
  qtd_aulas: z.string().min(1, "Quantidade de aulas é obrigatória"),
  aulas_praticas: z
    .string()
    .min(1, "Quantidade de aulas práticas é obrigatória"),
  aulas_teoricas: z
    .string()
    .min(1, "Quantidade de aulas teóricas é obrigatória"),
  curso_id: z.string().min(1, "Curso é obrigatório"),
  professor: z.string().min(1, "Professor é obrigatório"),
});

export const horarioSchema = z.object({
  sala: z.string().min(1, "Sala é obrigatória"),
  turma: z.string().min(1, "Turma é obrigatória"),
  professor: z.string().min(1, "Professor é obrigatório"),
  dia: z.string().min(1, "Dia é obrigatório"),
  hora_inicio: z.string().min(1, "Hora de inicio é obrigatória"),
  hora_fim: z.string().min(1, "Hora de fim é obrigatória"),
});

export const laboratorioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  curso_associado: z.string().min(1, "Curso associado é obrigatório"),
  equipamentos: z.record(z.string(), z.any(), {
    required_error: "Equipamentos são obrigatórios",
  }),
  capacidade: z.coerce.number().min(1, "Capacidade deve ser maior que 0"),
  bloco: z.string().min(1, "Bloco é obrigatório"),
  predio: z.string().min(1, "Prédio é obrigatório"),
});

export const salaSchema = z.object({
  nome_sala: z.string().min(1, "O nome é obrigatorio"),
  curso_associado: z.string().min(1, "Curso associado é obrigatório"),
  equipamentos: z.record(z.string(), z.any(), {
    required_error: "Equipamentos são obrigatórios",
  }),
  capacidade: z.coerce.number().min(1, "Capacidade deve ser maior que 0"),
  bloco: z.string().min(1, "Bloco é obrigatório"),
  predio: z.string().min(1, "Prédio é obrigatório"),
});
