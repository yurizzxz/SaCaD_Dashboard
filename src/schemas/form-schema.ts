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

// Academic Schemas

export const cursoSchema = z.object({
  nome_curso: z.string().min(1, "O nome do curso é obrigatório"),
  sigla: z.string().min(1, "A sigla é obrigatória"),
  area_tecnologica: z.string().min(1, "A área tecnológica é obrigatória"),
  duracao_em_semestres: z
    .string({
      required_error: "A duração é obrigatória",
      invalid_type_error: "A duração deve ser um número",
    })
    .min(1, "A duração deve ser maior que 0"),
  email_coordenador: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  periodo: z.enum(["Manhã", "Tarde", "Noite", "Integral"], {
    errorMap: () => ({ message: "Selecione um período válido" }),
  }),
  forma_oferecimento: z.enum(["Semestral", "Anual", "Bimestral", "Modular"], {
    errorMap: () => ({ message: "Selecione uma forma de oferecimento válida" }),
  }),
  modalidade: z.enum(["Presencial", "EAD", "Híbrido"], {
    errorMap: () => ({ message: "Selecione uma modalidade válida" }),
  }),
});

export const disciplinaSchema = z.object({
  nome: z.string().min(1, "O nome da disciplina é obrigatório"),
  sigla: z.string().min(1, "A sigla é obrigatória"),

  semestre: z.string().min(1, "O semestre é obrigatório"),

  area_tecnologica: z.string().min(1, "A área tecnológica é obrigatória"),

  qtd_aulas: z.string().min(1, "O semestre é obrigatório"),

  aulas_teoricas: z.string().min(1, "O semestre é obrigatório"),

  aulas_praticas: z.string().min(1, "O semestre é obrigatório"),

  modalidade: z.enum(["Presencial", "EAD", "Híbrido"], {
    errorMap: () => ({ message: "Selecione uma modalidade válida" }),
  }),

  curso_id: z
    .array(z.number())
    .nonempty("Selecione ao menos um curso")
    .optional(),
  professor: z
    .array(z.number())
    .nonempty("Selecione ao menos um professor")
    .optional(),
});

export const horarioAulaSchema = z.object({
  sala: z.string().min(1, "A sala é obrigatória"),
  turma: z.string().min(1, "A turma é obrigatória"),
  hora_inicio: z
    .string()
    .min(1, "A hora de início é obrigatória")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (ex: 08:00)"),

  hora_fim: z
    .string()
    .min(1, "A hora de fim é obrigatória")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (ex: 10:00)"),

  disciplina: z.string().min(1, "Selecione uma disciplina"),

  professor: z.array(z.number()).min(1, "Selecione ao menos um professor"),

  dia_semana: z.enum(
    [
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
      "Domingo",
    ],
    { errorMap: () => ({ message: "Selecione um dia válido da semana" }) }
  ),

  dia_numero: z.number().min(1, "O dia é obrigatório"),

  mes: z.enum(
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    { errorMap: () => ({ message: "Selecione um mês válido" }) }
  ),
});

// Class Schemas

export const laboratorioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  curso_id: z.array(z.number()).min(1, "Selecione ao menos um curso"),
  equipamentos: z.record(z.string(), z.any(), {
    required_error: "Equipamentos são obrigatórios",
  }),
  capacidade: z.coerce.number().min(1, "Capacidade deve ser maior que 0"),
  bloco: z.string().min(1, "Bloco é obrigatório"),
  predio: z.string().min(1, "Prédio é obrigatório"),
});

export const salaSchema = z.object({
  nome_sala: z.string().min(1, "O nome é obrigatorio"),
  curso_id: z.array(z.number()).min(1, "Selecione ao menos um curso"),
  equipamentos: z.record(z.string(), z.any(), {
    required_error: "Equipamentos são obrigatórios",
  }),
  capacidade: z.coerce.number().min(1, "Capacidade deve ser maior que 0"),
  bloco: z.string().min(1, "Bloco é obrigatório"),
  predio: z.string().min(1, "Prédio é obrigatório"),
});
