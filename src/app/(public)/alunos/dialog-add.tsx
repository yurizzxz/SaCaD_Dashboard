"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAlunos } from "@/hooks/useAlunos";
import { useState } from "react";

export function DialogAdicionarAluno() {
  const { cadastrarAluno } = useAlunos();

  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    data_nascimento: "",
    curso: "",
    semestre: 0,
    endereco: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "semestre" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await cadastrarAluno(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar Aluno</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Cadastrar Aluno</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo aluno
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome do Aluno</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              type="text"
              className="h-10"
              placeholder="ex: Yuri Alves"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email do Aluno</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="h-10"
              placeholder="ex: yuri@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cpf">CPF do Aluno</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
              type="text"
              className="h-10"
              placeholder="ex: 12345678900"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="data_nascimento">Data de Nascimento</Label>
            <Input
              id="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              type="date"
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="curso">Curso</Label>
            <Select
              onValueChange={(value) => handleSelectChange("curso", value)}
            >
              <SelectTrigger className="w-full" style={{ height: "40px" }}>
                <SelectValue placeholder={formData.curso || "Selecione o curso"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Análise e Desenvolvimento De Sistemas">
                  Análise e Desenvolvimento De Sistemas
                </SelectItem>
                <SelectItem value="Processos Gerenciais">
                  Processos Gerenciais
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="semestre">Semestre</Label>
            <Input
              id="semestre"
              value={formData.semestre}
              onChange={handleChange}
              type="number"
              className="h-10"
              placeholder="ex: 3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="h-10"
              placeholder="ex: Rua das Flores, 123"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="status">Status do Aluno</Label>
            <Select
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-full" style={{ height: "40px" }}>
                <SelectValue placeholder={formData.status || "Selecione o status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="">
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
