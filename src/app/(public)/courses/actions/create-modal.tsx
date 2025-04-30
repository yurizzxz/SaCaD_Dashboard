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
    area_tecnologica: "",
    duracao_em_semestres: "",
    periodo: "",
    modalidade: "",
    disciplinas: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nome: initialData.nome || "",
        area_tecnologica: initialData.area_tecnologica || "",
        duracao_em_semestres: initialData.duracao_em_semestres?.toString() || "",
        periodo: initialData.periodo || "",
        modalidade: initialData.modalidade || "",
        disciplinas: initialData.disciplinas || [],
      });
    } else {
      setFormData({
        id: 0,
        nome: "",
        area_tecnologica: "",
        duracao_em_semestres: "",
        periodo: "",
        modalidade: "",
        disciplinas: [],
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        name === "duracao_em_semestres" ? parseInt(value || "0") : value,
    }));
  };

  const handleSubmit = () => {
    const curso = { ...formData, id: initialData?.id };
    onSave(curso);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Curso" : "Cadastrar Curso"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Curso"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
