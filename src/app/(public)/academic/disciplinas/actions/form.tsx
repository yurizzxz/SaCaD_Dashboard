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

type FormFieldsProps = {
  formData: any;
  handleChange: (e: { target: { name: string; value: any } }) => void;
};
export function FormFields({ formData, handleChange }: FormFieldsProps) {
  const handleSelectChange = (name: string, value: string) => {
    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCursoChange = (cursoIds: number[]) => {
    handleChange({
      target: {
        name: "curso_id",
        value: cursoIds,
      },
    });
  };
  const handleProfessoresChange = (professoresIds: number[]) => {
    handleChange({
      target: {
        name: "professor",
        value: professoresIds,
      },
    });
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
    { name: "qtd_aulas", label: "Quantidade de Aulas", placeholder: "ex: 80" },
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
              type={field.name.includes("aulas") ? "number" : "text"}
              name={field.name}
              value={formData[field.name]}
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex flex-col gap-2 w-full">
          <Label>Modalidade</Label>
          <Select
            onValueChange={(value) => handleSelectChange("modalidade", value)}
            value={formData.modalidade}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Presencial">Presencial</SelectItem>
              <SelectItem value="EAD">EAD</SelectItem>
              <SelectItem value="Híbrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
      <div className="flex gap-2 flex-col w-full">
        <Label>Curso</Label>
        <FormCursoInput
          className="w-full"
          cursosSelecionados={
            Array.isArray(formData.curso_id) ? formData.curso_id : []
          }
          onCursoChange={handleCursoChange}
        />
      </div>
      <div className="flex gap-2 flex-col w-full">
        <Label>Professor</Label>
        <FormProfessorInput
          professoresSelecionados={
            Array.isArray(formData.professor) ? formData.professor : []
          }
          onProfessorChange={handleProfessoresChange}
          className="w-full"
        />
      </div>
      </>
  );
}
