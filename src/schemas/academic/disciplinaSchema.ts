import { z } from "zod";

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
  curso_id: z.array(z.number()).nonempty("Selecione ao menos um curso").optional(),
  professor: z.array(z.number()).nonempty("Selecione ao menos um professor").optional(),
});
