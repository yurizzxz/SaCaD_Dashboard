import { FormCursoInput } from "@/components/select/curso-input";
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

export function FormFields({ control, register, errors, setValue }: any) {
  const handleCursoChange = (cursoIds: number[]) => {
    setValue("curso_id", cursoIds, { shouldValidate: true });
  };

  const handleProfessoresChange = (professoresIds: number[]) => {
    setValue("professor", professoresIds, { shouldValidate: true });
  };

  const disciplinasFields = [
    { name: "nome", label: "Nome", placeholder: "ex: Matemática" },
    { name: "sigla", label: "Sigla", placeholder: "ex: MAT" },
    { name: "semestre", label: "Semestre", placeholder: "ex: 1" },
    {
      name: "area_tecnologica",
      label: "Área Tecnológica",
      placeholder: "ex: Tecnologia da Informação",
    },
    { name: "qtd_aulas", label: "Quantidade de Aulas", placeholder: "ex: 80", },
    { name: "aulas_teoricas", label: "Aulas Teóricas", placeholder: "ex: 30" },
    { name: "aulas_praticas", label: "Aulas Práticas", placeholder: "ex: 15" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        {disciplinasFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2 w-full">
          <Label>Modalidade</Label>
          <Controller
            control={control}
            name="modalidade"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
            <span className="text-red-500 text-sm">{errors.modalidade?.message}</span>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-col w-full">
        <Label>Curso</Label>
        <Controller
          control={control}
          name="curso_id"
          render={({ field }) => (
            <FormCursoInput
              className="w-full"
              cursosSelecionados={Array.isArray(field.value) ? field.value : []}
              onCursoChange={(ids: number[]) => field.onChange(ids)}
            />
          )}
        />
        {errors.curso_id && (
          <span className="text-red-500 text-sm -mt-2">{errors.curso_id?.message}</span>
        )}
      </div>

      <div className="flex gap-2 flex-col w-full">
        <Label>Professor</Label>
        <Controller
          control={control}
          name="professor"
          render={({ field }) => (
            <FormProfessorInput
              className="w-full"
              professoresSelecionados={Array.isArray(field.value) ? field.value : []}
              onProfessorChange={(ids: number[]) => field.onChange(ids)}
            />
          )}
        />
        {errors.professor && (
          <span className="text-red-500 text-sm -mt-2">{errors.professor?.message}</span>
        )}
      </div>
    </>
  );
}
