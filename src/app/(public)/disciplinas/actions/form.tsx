import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  const disciplinasFields = [
    { name: "nome", label: "Nome", placeholder: "ex: Matemática" },
    { name: "aulas_teoricas", label: "Aulas Teóricas", placeholder: "ex: 30" },
    { name: "aulas_praticas", label: "Aulas Práticas", placeholder: "ex: 15" },
  ];

  return (
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
    </div>
  );
}