import { FormCursoInput } from "@/components/select/curso-input";
import { FormDisciplinaInput } from "@/components/select/disciplina-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FormFields({ register, control, errors, setValue }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "nome", label: "Nome", placeholder: "ex: Paulo Henrique" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-00" },

        { name: "email", label: "Email", placeholder: "ex: nome@exemplo.com" },
        {
          name: "telefone",
          label: "Telefone",
          placeholder: "ex: (11) 92345-6789",
        },
      ].map((field) => (
        <div key={field.name} className="flex gap-2 flex-col w-full">
          <Label>{field.label}</Label>
          <Input placeholder={field.placeholder} {...register(field.name)} />
          {errors[field.name] && (
            <span className="text-red-500 text-sm">
              {errors[field.name]?.message}
            </span>
          )}
        </div>
      ))}
      <div className="flex gap-2 flex-col w-full">
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Afastado">Afastado</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <span className="text-red-500 text-sm">{errors.status.message}</span>
        )}
      </div>

      <div className="flex gap-2 flex-col">
        <Label>Data de Admissão</Label>
        <Input type="date" {...register("data_admissao")} />
        {errors.data_admissao && (
          <span className="text-red-500 text-sm">
            {errors.data_admissao.message}
          </span>
        )}
      </div>
      <div className="flex gap-2 flex-col w-full">
        <Label>Curso</Label>
        <Controller
          name="curso_id"
          control={control}
          render={({ field }) => (
            <FormCursoInput
              className="w-full"
              cursosSelecionados={Array.isArray(field.value) ? field.value : []}
              onCursoChange={(ids) => field.onChange(ids)}
            />
          )}
        />
        {errors.curso_id && (
          <span className="text-red-500 text-sm">
            {errors.curso_id.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 flex-col">
        <Label>Disciplina</Label>
        <Controller
          name="disciplina_id"
          control={control}
          render={({ field }) => (
            <FormDisciplinaInput
              className="w-full"
              disciplinasSelecionadas={
                Array.isArray(field.value) ? field.value : []
              }
              onDisciplinaChange={(ids) => field.onChange(ids)}
            />
          )}
        />
        {errors.disciplina_id && (
          <span className="text-red-500 text-sm">
            {errors.disciplina_id.message}
          </span>
        )}
      </div>
    </div>
  );
}
