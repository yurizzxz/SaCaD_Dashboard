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
    sala: "",
    dia_semana: "",
    dia_numero: "",
    mes: "",
    hora_inicio: "",
    hora_fim: "",
    turma: "",
    disciplina: "",
    professor: "",
  });

  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setFormData({
        id: initialData.id,
        sala: initialData.sala || "",
        dia_semana: initialData.dia_semana || "",
        dia_numero: initialData.dia_numero || "",
        mes: initialData.mes || "",
        hora_inicio: initialData.hora_inicio || "",
        hora_fim: initialData.hora_fim || "",
        turma: initialData.turma || "",
        disciplina: initialData.disciplina || "",
        professor: initialData.professor || "",
      });
    } else {
      setFormData({
        id: 0,
        sala: "",
        dia_semana: "",
        dia_numero: "",
        mes: "",
        hora_inicio: "",
        hora_fim: "",
        turma: "",
        disciplina: "",
        professor: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const horario = { ...formData, id: initialData?.id };
    onSave(horario);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Horário" : "Cadastrar Horário"}
          </DialogTitle>
        </DialogHeader>

        <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Horário"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
