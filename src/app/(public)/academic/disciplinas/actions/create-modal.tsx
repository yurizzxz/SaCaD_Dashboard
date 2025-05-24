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
    aulas_teoricas: 0,
    aulas_praticas: 0,
    sigla: "",
    curso_id: [] as string[],
    professor: [] as string[],
    semestre: 0,
    area_tecnologica: "",
    modalidade: "",
    qtd_aulas: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nome: initialData.nome || "",
        aulas_teoricas: initialData.aulas_teoricas || 0,
        aulas_praticas: initialData.aulas_praticas || 0,
        sigla: initialData.sigla || "",
        curso_id: Array.isArray(initialData.curso_id)
          ? initialData.curso_id
          : (typeof initialData.curso_id === "string" ? initialData.curso_id.split(",") : []) || [],
        professor: Array.isArray(initialData.professor)
          ? initialData.professor
          : (typeof initialData.professor === "string" ? initialData.professor.split(",") : []) || [],
        semestre: initialData.semestre || 0,
        area_tecnologica: initialData.area_tecnologica || "",
        modalidade: initialData.modalidade || "",
        qtd_aulas: initialData.qtd_aulas || 0,
      });
    } else {
      setFormData({
        id: 0,
        nome: "",
        aulas_teoricas: 0,
        aulas_praticas: 0,
        sigla: "",
        curso_id: [],
        professor: [],
        semestre: 0,
        area_tecnologica: "",
        modalidade: "",
        qtd_aulas: 0,
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
