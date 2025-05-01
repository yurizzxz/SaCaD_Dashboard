import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  return (
    <div className="flex flex-col gap-4 py-2">
      {[
        { name: "nome", label: "Nome do Curso", placeholder: "ex: Engenharia da Computação" },
        { name: "area_tecnologica", label: "Área Tecnológica", placeholder: "ex: Tecnologia da Informação" },
        { name: "duracao_em_semestres", label: "Duração (semestres)", placeholder: "ex: 10" },
        { name: "periodo", label: "Período", placeholder: "ex: Noite" },
        { name: "email_coordenador" , label: "Email do Coordenador", placeholder: "ex: nome@exemplo.com" },
        { name: "modalidade", label: "Modalidade", placeholder: "ex: Presencial" },
        { name: "forma_oferecimento" , label: "Forma de Oferecimento", placeholder: "ex: Semestral, Anual, Bimestral etc." },
      ].map((field) => (
        <div key={field.name} className="flex gap-2 flex-col w-full">
          <Label>{field.label}</Label>
          <Input
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
