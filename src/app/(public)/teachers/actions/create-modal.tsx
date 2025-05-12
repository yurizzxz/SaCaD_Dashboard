import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";

export function Modal({ open, onOpenChange, initialData, onSave }: any) {
  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    disciplinas_id: [] as string[],
    cpf: "",
    curso_id: [] as string[],
    data_admissao: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nome: initialData.nome || "",
        disciplinas_id: Array.isArray(initialData.disciplinas_id)
          ? initialData.disciplinas_id
          : (typeof initialData.disciplinas_id === "string"
              ? initialData.disciplinas_id.split(",")
              : []) || [],
        cpf: initialData.cpf || "",
        curso_id: Array.isArray(initialData.curso_id)
          ? initialData.curso_id
          : (typeof initialData.curso_id === "string"
              ? initialData.curso_id.split(",")
              : []) || [],
        data_admissao: initialData.data_admissao || "",
        status: initialData.status || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({
        id: 0,
        nome: "",
        disciplinas_id: [],
        cpf: "",
        curso_id: [],
        data_admissao: "",
        status: "",
        email: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const professor = { ...formData, id: initialData?.id };
    onSave(professor);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Professor" : "Cadastrar Professor"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Professor"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
