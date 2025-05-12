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
    disciplinas_id: [],
    cpf: "",
    curso_id: [],
    data_admissao: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nome: initialData.nome || "",
        disciplinas_id: initialData.disciplinas_id || [],
        cpf: initialData.cpf || "",
        curso_id: initialData.curso_id || [],
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

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "aulas_teoricas" || name === "aulas_praticas"
          ? parseInt(value || "0")
          : value,
    }));
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
