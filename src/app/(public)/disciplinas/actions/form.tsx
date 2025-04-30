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
      {formData.disciplinas?.map((disciplina: any, index: number) => (
        <div key={disciplina.id} className="border p-4 rounded-md col-span-2 space-y-4">
          <h3 className="font-semibold">Disciplina {index + 1}</h3>
          
          {disciplinasFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <Label>{field.label}</Label>
              <Input
                type={field.name === "aulas_teoricas" || field.name === "aulas_praticas" ? "number" : "text"}
                name={`disciplinas[${index}].${field.name}`}
                value={disciplina[field.name]}
                placeholder={field.placeholder}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: "disciplinas",
                      value: formData.disciplinas.map((d: any, i: number) =>
                        i === index ? { ...d, [field.name]: field.name.includes('aulas') ? +e.target.value : e.target.value } : d
                      ),
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
