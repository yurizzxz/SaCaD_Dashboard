import { FormCursoInput } from "@/components/select/curso-input";
import { FormDisciplinaInput } from "@/components/select/disciplina-input";
import { FormDisciplinaSelect } from "@/components/select/form-select";
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

  const handleDisciplinaChange = (disciplinaIds: number[]) => {
    handleChange({
      target: {
        name: "disciplina_id",
        value: disciplinaIds,
      },
    });
  };

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
          <Input
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="flex gap-2 flex-col w-full">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => handleSelectChange("status", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Afastado">Afastado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 flex-col">
        <Label>Data de Admissão</Label>
        <Input
          name="data_admissao"
          type="date"
          value={formData.data_admissao}
          onChange={handleChange}
        />
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
      <div className="flex gap-2 flex-col">
        <Label>Disciplina</Label>
        <FormDisciplinaInput
          className="w-full"
          disciplinasSelecionadas={
            Array.isArray(formData.disciplina_id) ? formData.disciplina_id : []
          }
          onDisciplinaChange={handleDisciplinaChange}
        />
      </div>
    </div>
  );
}
