import { z } from "zod";

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
    errorMap: () => ({
      message: "Selecione uma forma de oferecimento válida",
    }),
  }),
  modalidade: z.enum(["Presencial", "EAD", "Híbrido"], {
    errorMap: () => ({ message: "Selecione uma modalidade válida" }),
  }),
});
