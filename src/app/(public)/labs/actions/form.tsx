import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { X } from "lucide-react";

type FormFieldsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormFields({ formData, handleChange }: FormFieldsProps) {
  const [newEquipamento, setNewEquipamento] = useState("");
  const [newQuantidade, setNewQuantidade] = useState("");

  const handleAddEquipamento = () => {
    if (newEquipamento && newQuantidade) {
      const updatedEquipamentos = {
        ...formData.equipamentos,
        [newEquipamento]: parseInt(newQuantidade, 10),
      };
      handleChange({
        target: { name: "equipamentos", value: updatedEquipamentos },
      } as React.ChangeEvent<HTMLInputElement>);
      setNewEquipamento("");
      setNewQuantidade("");
    }
  };

  const handleRemoveEquipamento = (equipamento: string) => {
    const updatedEquipamentos = { ...formData.equipamentos };
    delete updatedEquipamentos[equipamento];
    handleChange({
      target: { name: "equipamentos", value: updatedEquipamentos },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      {[
        {
          name: "nome",
          label: "Nome do Laboratório",
          placeholder: "ex: Laboratório de Informática",
        },
        {
          name: "curso_associado",
          label: "Curso Associado",
          placeholder: "ex: Engenharia da Computação",
        },
        {
          name: "capacidade",
          label: "Capacidade",
          placeholder: "ex: 30",
        },
      ].map((field) => (
        <div key={field.name} className="flex flex-col gap-2 w-full">
          <Label>{field.label}</Label>
          <Input
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className="flex flex-col gap-4  w-full mt-4">
        <div className="flex flex-col gap-2 w-full">
          <Label>Equipamentos</Label>

          <Input
            placeholder="Tipo de Equipamento"
            value={newEquipamento}
            onChange={(e) => setNewEquipamento(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Quantidade</Label>
          <Input
            placeholder="Quantidade"
            type="number"
            value={newQuantidade}
            onChange={(e) => setNewQuantidade(e.target.value)}
          />
        </div>
        <Button onClick={handleAddEquipamento} className="w-fit">
          Adicionar Equipamento
        </Button>

        <div>
          <p>Equipamentos:</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(formData.equipamentos || {}).map(
              ([equip, qtd]: any) => (
                <div key={equip} className="flex flex-row items-center gap-2">
                  <span className="px-2 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center">
                    {equip}: {qtd}
                    <button
                      onClick={() => handleRemoveEquipamento(equip)}
                      className="ml-2 cursor-pointer text-primary-foreground"
                    >
                      <X size={16} />
                    </button>
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
