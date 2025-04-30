import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function AlunoModal({ open, onOpenChange, initialData, onSave, onDelete }: any) {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    curso: "",
    status: "",
    semestre: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        cpf: initialData.cpf || "",
        curso: initialData.curso || "",
        status: initialData.status || "",
        semestre: initialData.semestre || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({
        nome: "",
        cpf: "",
        curso: "",
        status: "",
        semestre: "",
        email: "",
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Aluno" : "Cadastrar Aluno"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <Input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
          <Input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} />
          <Input name="curso" placeholder="Curso" value={formData.curso} onChange={handleChange} />
          <Input name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
          <Input name="semestre" placeholder="Semestre" value={formData.semestre} onChange={handleChange} />
          <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="flex justify-between mt-4">
          {initialData?.id && (
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Tem certeza que deseja excluir este aluno?")) {
                  onDelete(initialData.id);
                }
              }}
            >
              Excluir
            </Button>
          )}
          <div className="ml-auto">
            <Button onClick={handleSubmit}>
              {initialData ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
