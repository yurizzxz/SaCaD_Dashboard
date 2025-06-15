import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FormCursoInput } from "@/components/select/curso-input";

export function FormFields({ register, control, errors, setValue }: any) {
  const [newEquipamento, setNewEquipamento] = useState("");
  const [newQuantidade, setNewQuantidade] = useState("");

  const handleAddEquipamento = (currentEquipamentos: Record<string, number>) => {
    if (newEquipamento && newQuantidade) {
      const updated = {
        ...currentEquipamentos,
        [newEquipamento]: parseInt(newQuantidade, 10),
      };
      setValue("equipamentos", updated);
      setNewEquipamento("");
      setNewQuantidade("");
    }
  };

  const handleRemoveEquipamento = (
    currentEquipamentos: Record<string, number>,
    equipamento: string
  ) => {
    const updated = { ...currentEquipamentos };
    delete updated[equipamento];
    setValue("equipamentos", updated);
  };

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-2 w-full">
        <Label>Nome</Label>
        <Input {...register("nome")} placeholder="ex: Laboratório de Informática" />
        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
      </div>

      <div className="grid grid-cols-3 gap-4 py-1">
        {[
         
          {
            name: "capacidade",
            label: "Capacidade",
            placeholder: "ex: 30",
          },
          {
            name: "predio",
            label: "Prédio",
            placeholder: "ex: 1",
          },
          {
            name: "bloco",
            label: "Bloco",
            placeholder: "ex: B",
          },
        ].map((field) => (
          <div key={field.name} className="flex flex-col gap-2 w-full">
            <Label>{field.label}</Label>
            <Input {...register(field.name)} placeholder={field.placeholder} />
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                {errors[field.name]?.message}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-col w-full">
        <Label>Curso</Label>
        <Controller
          control={control}
          name="curso_id"
          render={({ field }) => (
            <FormCursoInput
              className="w-full"
              cursosSelecionados={field.value}
              onCursoChange={(val) => setValue("curso_id", val)}
            />
          )}
        />
        {errors.curso_id && (
          <span className="text-red-500 text-sm">{errors.curso_id.message}</span>
        )}
      </div>

      <Controller
        control={control}
        name="equipamentos"
        defaultValue={{}}
        render={({ field }) => (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label>Equipamentos</Label>
              <Input
                placeholder="Ex: Computador"
                value={newEquipamento}
                onChange={(e) => setNewEquipamento(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Label>Quantidade</Label>
              <Input
                placeholder="Ex: 30"
                type="number"
                value={newQuantidade}
                onChange={(e) => setNewQuantidade(e.target.value)}
              />
            </div>

            <Button
              type="button"
              onClick={() => handleAddEquipamento(field.value)}
              className="w-fit"
            >
              Adicionar Equipamento
            </Button>

            <div>
              <p>Equipamentos:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(field.value || {}).map(([equip, qtd]) => (
                  <div key={equip} className="flex flex-row items-center gap-2">
                    <span className="px-2 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center">
                      {equip}: {qtd as number}
                      <button
                        type="button"
                        onClick={() => handleRemoveEquipamento(field.value, equip)}
                        className="ml-2 cursor-pointer text-primary-foreground"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
