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
        { name: "nome", label: "Nome", placeholder: "ex: nome sobrenome" },
        { name: "cpf", label: "CPF", placeholder: "ex: 123.456.789-10" },
        { name: "curso", label: "Curso", placeholder: "ex: Engenharia da Computação" },
        { name: "status", label: "Status", placeholder: "ex: Ativo" },
        { name: "semestre", label: "Semestre", placeholder: "ex: 4" },
        { name: "email", label: "Email", placeholder: "ex: nome@gmail.com" },
        { name: "telefone", label: "Telefone", placeholder: "ex: (11) 98765-4321" },
        { name: "endereco", label: "Endereço", placeholder: "ex: Rua Exemplo, 45, Bairro X, Cidade Y" },
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
        <Label>Data de Nascimento</Label>
        <Input
          name="data_nascimento"
          type="date"
          value={formData.data_nascimento}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Label>Data de Matrícula</Label>
        <Input
          name="data_matricula"
          type="date"
          value={formData.data_matricula}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
