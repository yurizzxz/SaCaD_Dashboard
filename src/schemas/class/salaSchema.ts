import { z } from "zod";

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
