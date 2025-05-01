import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";

export function Modal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: any) {
  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    curso_associado: "",
    equipamentos: {},
    capacidade: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || 0,
        nome: initialData.nome || "",
        curso_associado: initialData.curso_associado || "",
        equipamentos: initialData.equipamentos || {},
        capacidade: initialData.capacidade || 0
      });
    } else {
      setFormData({
        id: 0,
        nome: "",
        curso_associado: "",
        equipamentos: {},
        capacidade: 0
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const sala = { ...formData, id: initialData?.id };
    onSave(sala);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Sala" : "Cadastrar Sala"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Sala"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
