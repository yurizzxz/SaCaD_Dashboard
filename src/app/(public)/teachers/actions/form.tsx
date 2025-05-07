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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  const handleSelectChange = (name: string, value: string) => {
    handleChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "nome", label: "Nome", placeholder: "ex: Paulo Henrique" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-00" },
        {
          name: "disciplinas_id",
          label: "Disciplina",
          placeholder: "ex: Matemática Discreta",
        },
        { name: "email", label: "Email", placeholder: "ex: nome@exemplo.com" },
        {
          name: "telefone",
          label: "Telefone",
          placeholder: "ex: (11) 92345-6789",
        },
        {
          name: "curso_id",
          label: "Curso",
          placeholder: "ex: Engenharia da Computação",
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
    </div>
  );
}
