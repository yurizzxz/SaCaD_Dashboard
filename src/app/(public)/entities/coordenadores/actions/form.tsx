import { FormCursoInput } from "@/components/select/curso-input";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormFields({ register, control, errors, setValue }: any) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        {[
          { name: "nome", label: "Nome", placeholder: "ex: nome sobrenome" },
          { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-10" },
          { name: "email", label: "Email", placeholder: "ex: nome@gmail.com" },
          {
            name: "telefone",
            label: "Telefone",
            placeholder: "ex: (11) 98765-4321",
          },
        ].map((field) => (
          <div key={field.name} className="flex gap-2 flex-col w-full">
            <Label>{field.label}</Label>
            <Input {...register(field.name)} placeholder={field.placeholder} />
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                {errors[field.name]?.message}
              </span>
            )}
          </div>
        ))}
      </div>
      <div>
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
            <span className="text-red-500 text-sm">
              {errors.curso_id.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
