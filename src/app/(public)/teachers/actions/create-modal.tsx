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
    nome: "",
    disciplina: "",
    cpf: "",
    cursos: [],
    data_admissao: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        disciplina: initialData.disciplina || "",
        cpf: initialData.cpf || "",
        cursos: initialData.cursos || [],
        data_admissao: initialData.data_admissao || "",
        status: initialData.status || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({
        nome: "",
        disciplina: "",
        cpf: "",
        cursos: [],
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
