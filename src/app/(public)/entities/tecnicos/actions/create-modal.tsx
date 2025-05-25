import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";

export function TecnicoModal({ open, onOpenChange, initialData, onSave }: any) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    setor: "",
    email: "",
    status: "",
    telefone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        cpf: initialData.cpf || "",
        setor: initialData.setor || "",
        email: initialData.email || "",
        telefone: initialData.telefone || "",
        status: initialData.status || "",
      });
    } else {
      setFormData({
        nome: "",
        cpf: "",
        setor: "",
        email: "",
        telefone: "",
        status: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const tecnico = { ...formData, id: initialData?.id };
    onSave(tecnico);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Técnico" : "Cadastrar Técnico"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Técnico"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
