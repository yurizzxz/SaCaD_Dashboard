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

export function FormFields({
  register,
  control,
  errors,
  setValue,
  handleChange,
}: any) {
  const handleSelectChange = (name: string, value: string) => {
    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        {
          name: "nome_curso",
          label: "Nome do Curso",
          placeholder: "ex: Engenharia da Computação",
        },
        { name: "sigla", label: "Sigla", placeholder: "ex: EDC" },
        {
          name: "area_tecnologica",
          label: "Área Tecnológica",
          placeholder: "ex: Tecnologia da Informação",
        },
        {
          name: "duracao_em_semestres",
          label: "Duração (semestres)",
          placeholder: "ex: 10",
        },
        {
          name: "email_coordenador",
          label: "Email do Coordenador",
          placeholder: "ex: nome@exemplo.com",
        },
      ].map((field, index) => (
        <div key={field.name} className="flex gap-2 flex-col w-full">
          <Label>{field.label}</Label>
          <Input {...register(field.name)} placeholder={field.placeholder} />
          {errors[field.name] && (
            <span className="text-red-500 text-sm">
              {errors[field.name].message}
            </span>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2 w-full">
        <Label>Período</Label>
        <Controller
          control={control}
          name="periodo"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manhã">Manhã</SelectItem>
                <SelectItem value="Tarde">Tarde</SelectItem>
                <SelectItem value="Noite">Noite</SelectItem>
                <SelectItem value="Integral">Integral</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.periodo && (
          <span className="text-red-500 text-sm">{errors.periodo.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Forma de Oferecimento</Label>
        <Controller
          control={control}
          name="forma_oferecimento"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a forma de oferecimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semestral">Semestral</SelectItem>
                <SelectItem value="Anual">Anual</SelectItem>
                <SelectItem value="Bimestral">Bimestral</SelectItem>
                <SelectItem value="Modular">Modular</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.forma_oferecimento && (
          <span className="text-red-500 text-sm">
            {errors.forma_oferecimento.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Modalidade</Label>
        <Controller
          control={control}
          name="modalidade"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Presencial">Presencial</SelectItem>
                <SelectItem value="EAD">EAD</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.modalidade && (
          <span className="text-red-500 text-sm">
            {errors.modalidade.message}
          </span>
        )}
      </div>
    </div>
  );
}
