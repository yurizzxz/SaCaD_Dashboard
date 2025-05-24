import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FormFields } from "./form";

export function AlunoModal({
  open,
  onOpenChange,
  initialData,
  onSave,
}: any) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    curso_id: "",
    status: "",
    semestre: "",
    email: "",
    telefone: "",
    endereco: "",
    data_nascimento: "",
    data_matricula: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        cpf: initialData.cpf || "",
        curso_id: initialData.curso_id || "",
        status: initialData.status || "",
        semestre: initialData.semestre || "",
        email: initialData.email || "",
        telefone: initialData.telefone || "",
        endereco: initialData.endereco || "",
        data_nascimento: initialData.data_nascimento || "",
        data_matricula: initialData.data_matricula || "",
      });
    } else {
      setFormData({
        nome: "",
        cpf: "",
        curso_id: "",
        status: "",
        semestre: "",
        email: "",
        telefone: "",
        endereco: "",
        data_nascimento: "",
        data_matricula: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const aluno = { ...formData, id: initialData?.id };
    onSave(aluno);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar Aluno" : "Cadastrar Aluno"}
          </DialogTitle>
        </DialogHeader>

          <FormFields formData={formData} handleChange={handleChange} />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? "Salvar Alterações" : "Cadastrar Aluno"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
