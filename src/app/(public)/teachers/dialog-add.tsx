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
import { useTeachers } from "@/hooks/useTeachers";
import { useState } from "react";

interface Curso {
  nome_curso: string;
  semestre: number;
  aulas_teoricas: number;
  aulas_praticas: number;
}

export function DialogAdicionarProfessor() {
  const { cadastrarTeacher } = useTeachers();

  const [formData, setFormData] = useState({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    disciplina: "",
    data_admissao: "",
    status: "",
    cursos: [
      {
        nome_curso: "",
        semestre: 0,
        aulas_teoricas: 0,
        aulas_praticas: 0,
      },
    ],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "semestre" || id === "aulas_teoricas" || id === "aulas_praticas"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCursoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newCursos = [...formData.cursos];

    const key = name as keyof Curso;

    if (
      key === "semestre" ||
      key === "aulas_teoricas" ||
      key === "aulas_praticas"
    ) {
      newCursos[index][key] = Number(value) as any;
    } else {
      newCursos[index][key] = value as any;
    }

    setFormData((prev) => ({ ...prev, cursos: newCursos }));
  };

  const handleSubmit = async () => {
    await cadastrarTeacher(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cadastrar Professor</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Cadastrar Professor</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo professor.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nome">Nome do Professor</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              type="text"
              className="h-10"
              placeholder="ex: Paulo Henrique"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email do Professor</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="h-10"
              placeholder="ex: paulo.henrique@exemplo.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="telefone">Telefone do Professor</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={handleChange}
              type="text"
              className="h-10"
              placeholder="ex: (11) 92345-6789"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="disciplina">Disciplina</Label>
            <Input
              id="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              type="text"
              className="h-10"
              placeholder="ex: Matemática Discreta"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="data_admissao">Data de Admissão</Label>
            <Input
              id="data_admissao"
              value={formData.data_admissao}
              onChange={handleChange}
              type="date"
              className="h-10"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="status">Status do Professor</Label>
            <Select
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger className="w-full" style={{ height: "40px" }}>
                <SelectValue
                  placeholder={formData.status || "Selecione o status"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Afastado">Afastado</SelectItem>
                <SelectItem value="Suspenso">Suspenso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.cursos.map((curso, index) => (
            <div key={index} className="col-span-2 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`nome_curso-${index}`}>Curso</Label>
                  <Input
                    id={`nome_curso-${index}`}
                    name="nome_curso"
                    value={curso.nome_curso}
                    onChange={(e) => handleCursoChange(e, index)}
                    type="text"
                    className="h-10"
                    placeholder="ex: Engenharia da Computação"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`semestre-${index}`}>Semestre</Label>
                  <Input
                    id={`semestre-${index}`}
                    name="semestre"
                    value={curso.semestre}
                    onChange={(e) => handleCursoChange(e, index)}
                    type="number"
                    className="h-10"
                    placeholder="ex: 4"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`aulas_teoricas-${index}`}>Aulas Teóricas</Label>
                  <Input
                    id={`aulas_teoricas-${index}`}
                    name="aulas_teoricas"
                    value={curso.aulas_teoricas}
                    onChange={(e) => handleCursoChange(e, index)}
                    type="number"
                    className="h-10"
                    placeholder="ex: 30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`aulas_praticas-${index}`}>Aulas Práticas</Label>
                  <Input
                    id={`aulas_praticas-${index}`}
                    name="aulas_praticas"
                    value={curso.aulas_praticas}
                    onChange={(e) => handleCursoChange(e, index)}
                    type="number"
                    className="h-10"
                    placeholder="ex: 10"
                  />
                </div>
              </div>
            </div>
          ))}

          
        </div>

        <DialogFooter>
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
