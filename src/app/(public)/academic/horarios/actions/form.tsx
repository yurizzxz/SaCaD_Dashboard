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
        { name: "sala", label: "Sala", placeholder: "ex: A101" },
        { name: "turma", label: "Turma", placeholder: "ex: ADS-2024-T1" },
        { name: "hora_inicio", label: "Hora de Início", placeholder: "ex: 08:00" },
        { name: "hora_fim", label: "Hora de Fim", placeholder: "ex: 10:00" },
        { name: "disciplina", label: "Disciplina", placeholder: "ex: Estrutura de Dados" },
        { name: "professor", label: "Professor", placeholder: "ex: João Silva" },
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

      <div className="flex flex-col gap-2 w-full">
        <Label>Dia da Semana</Label>
        <Select
          onValueChange={(value) => handleSelectChange("dia_semana", value)}
          value={String(formData.dia_semana)}
        >
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
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Dia do Mês</Label>
        <Input
          type="number"
          name="dia_numero"
          placeholder="ex: 22"
          value={formData.dia_numero || ""}
          onChange={handleChange}
          min={1}
          max={31}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label>Mês</Label>
        <Select
          onValueChange={(value) => handleSelectChange("mes", value)}
          value={String(formData.mes)}
        >
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
      </div>
    </div>
  );
}
