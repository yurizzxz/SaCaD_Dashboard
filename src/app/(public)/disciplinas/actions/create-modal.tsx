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
    aulas_praticas: 0,
    aulas_teoricas: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nome: initialData.nome || "",
        aulas_praticas: initialData.aulas_praticas || 0,
        aulas_teoricas: initialData.aulas_teoricas || 0,
      });
    } else {
      setFormData({
        id: 0,
        nome: "",
        aulas_praticas: 0,
        aulas_teoricas: 0,
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "aulas_teoricas" || name === "aulas_praticas" ? parseInt(value || "0") : value,
    }));
  };

  const handleSubmit = () => {
    const disciplina = { ...formData, id: initialData?.id };
    onSave(disciplina);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Disciplina" : "Cadastrar Disciplina"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Disciplina"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
