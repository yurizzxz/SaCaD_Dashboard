import { z } from "zod";

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
