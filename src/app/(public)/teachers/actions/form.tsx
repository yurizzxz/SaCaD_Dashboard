import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
      {[
        { name: "nome", label: "Nome", placeholder: "ex: Paulo Henrique" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-00" },
        { name: "disciplina", label: "Disciplina", placeholder: "ex: Matemática Discreta" },
        { name: "status", label: "Status", placeholder: "ex: Ativo" },
        { name: "email", label: "Email", placeholder: "ex: nome@exemplo.com" },
        { name: "telefone", label: "Telefone", placeholder: "ex: (11) 92345-6789" },
        { name: "cursos", label: "Curso", placeholder: "ex: Engenharia da Computação" },
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
