import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

export function FormFields({ register, control, errors }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "nome", label: "Nome", placeholder: "ex: nome sobrenome" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-10" },
        { name: "email", label: "Email", placeholder: "ex: nome@gmail.com" },
        { name: "telefone", label: "Telefone", placeholder: "ex: (11) 98765-4321" },
        { name: "setor", label: "Setor", placeholder: "ex: TI" },
      ].map((field) => (
        <div key={field.name} className="flex gap-2 flex-col w-full">
          <Label>{field.label}</Label>
          <Input
            {...register(field.name)}
            placeholder={field.placeholder}
          />
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
          control={control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
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
    </div>
  );
}
