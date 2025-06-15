import { FormDisciplinaInput } from "@/components/select/disciplina-input";
import { FormProfessorInput } from "@/components/select/professor-input";
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
  formData,
  handleChange,
  control,
  register,
  errors,
  setValue,
}: any) {
  const handleSelectChange = (name: string, value: string) => {
    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "sala", label: "Sala", placeholder: "ex: A101" },
        { name: "turma", label: "Turma", placeholder: "ex: ADS-2024-T1" },
        {
          name: "hora_inicio",
          label: "Hora de Início",
          placeholder: "ex: 08:00",
        },
        { name: "hora_fim", label: "Hora de Fim", placeholder: "ex: 10:00" },
        // { name: "disciplina", label: "Disciplina", placeholder: "ex: Estrutura de Dados" },
        // { name: "professor", label: "Professor", placeholder: "ex: João Silva" },
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

      <div className="flex gap-2 flex-col w-full">
        <Label>Professor</Label>
        <Controller
          control={control}
          name="professor"
          render={({ field }) => (
            <FormProfessorInput
              className="w-full"
              professoresSelecionados={
                Array.isArray(field.value) ? field.value : []
              }
              onProfessorChange={(ids: number[]) => field.onChange(ids)}
            />
          )}
        />
        {errors.professor && (
          <span className="text-red-500 text-sm -mt-2">
            {errors.professor?.message}
          </span>
        )}
      </div>

      <div className="flex gap-2 flex-col w-full">
        <Label>Disciplina</Label>
        <Controller
          control={control}
          name="disciplina"
          render={({ field }) => (
            <FormDisciplinaInput
              className="w-full"
              disciplinasSelecionadas={
                Array.isArray(field.value) ? field.value : []
              }
              onDisciplinaChange={(ids: number[]) => field.onChange(ids)}
            />
          )}
        />
        {errors.disciplina && (
          <span className="text-red-500 text-sm -mt-2">
            {errors.disciplina?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Dia da Semana</Label>
        <Controller
          control={control}
          name="dia_semana"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o dia da semana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Segunda-Feira">Segunda-feira</SelectItem>
                <SelectItem value="Terça-Feira">Terça-feira</SelectItem>
                <SelectItem value="Quarta-Feira">Quarta-feira</SelectItem>
                <SelectItem value="Quinta-Feira">Quinta-feira</SelectItem>
                <SelectItem value="Sexta-Feira">Sexta-feira</SelectItem>
                <SelectItem value="Sábado">Sábado</SelectItem>
                <SelectItem value="Domingo">Domingo</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.dia_semana && (
          <span className="text-red-500 text-sm">
            {errors.dia_semana?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Dia do Mês</Label>
        <Input
          type="number"
          {...register("dia_do_mes")}
          placeholder="ex: 22"
          min={1}
          max={31}
        />
        {errors.dia_do_mes && (
          <span className="text-red-500 text-sm">
            {errors.dia_do_mes?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Mês</Label>
        <Controller
          control={control}
          name="mes"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">Janeiro</SelectItem>
                <SelectItem value="02">Fevereiro</SelectItem>
                <SelectItem value="03">Março</SelectItem>
                <SelectItem value="04">Abril</SelectItem>
                <SelectItem value="05">Maio</SelectItem>
                <SelectItem value="06">Junho</SelectItem>
                <SelectItem value="07">Julho</SelectItem>
                <SelectItem value="08">Agosto</SelectItem>
                <SelectItem value="09">Setembro</SelectItem>
                <SelectItem value="10">Outubro</SelectItem>
                <SelectItem value="11">Novembro</SelectItem>
                <SelectItem value="12">Dezembro</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.mes && (
          <span className="text-red-500 text-sm">{errors.mes?.message}</span>
        )}
      </div>
    </div>
  );
}
