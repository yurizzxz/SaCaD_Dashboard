import { Controller } from "react-hook-form";
import { FormCursoInput } from "@/components/select/curso-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FormFields({
  register,
  control,
  errors,
  setValue,
}: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "nome", label: "Nome", placeholder: "ex: nome sobrenome" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-10" },
        { name: "semestre", label: "Semestre", placeholder: "ex: 4" },
        { name: "email", label: "Email", placeholder: "ex: nome@gmail.com" },
        {
          name: "telefone",
          label: "Telefone",
          placeholder: "ex: (11) 98765-4321",
        },
        {
          name: "endereco",
          label: "Endereço",
          placeholder: "ex: Rua Exemplo, 45, Bairro X, Cidade Y",
        },
      ].map((field) => (
        <div key={field.name} className="flex gap-2 flex-col w-full">
          <Label>{field.label}</Label>
          <Input
            {...register(field.name)}
            placeholder={field.placeholder}
          />
          {errors[field.name] && (
            <span className="text-red-500 text-sm">{errors[field.name]?.message}</span>
          )}
        </div>
      ))}

      <div className="flex gap-2 flex-col w-full">
        <Label>Status</Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
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
        <Label>Data de Nascimento</Label>
        <Input type="date" {...register("data_nascimento")} />
        {errors.data_nascimento && (
          <span className="text-red-500 text-sm">{errors.data_nascimento.message}</span>
        )}
      </div>

      <div className="flex gap-2 flex-col">
        <Label>Data de Matrícula</Label>
        <Input type="date" {...register("data_matricula")} />
        {errors.data_matricula && (
          <span className="text-red-500 text-sm">{errors.data_matricula.message}</span>
        )}
      </div>

      <div className="flex gap-2 flex-col w-full">
        <Label>Curso</Label>
        <Controller
          control={control}
          name="curso_id"
          render={({ field }) => (
            <FormCursoInput
              className="w-full"
              cursosSelecionados={field.value}
              onCursoChange={(val) => setValue("curso_id", val)}
            />
          )}
        />
        {errors.curso_id && (
          <span className="text-red-500 text-sm">{errors.curso_id.message}</span>
        )}
      </div>
    </div>
  );
}
