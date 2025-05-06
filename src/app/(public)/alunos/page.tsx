"use client";

import { AlunoModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { FilterSelect } from "./filter";
import { useAlunoHooks } from "@/hooks/alunos/actions";
import { Aluno, Curso } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const [cursos, setCursos] = useState<Curso[]>([]);

  const {
    alunos,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    alunoSelecionado,
  } = useAlunoHooks();

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const cursoIdSelecionado = cursos.find(
    (curso) => curso.nome_curso === cursoSelecionado
  )?.id;

  const alunosFiltrados =
    cursoSelecionado === "todos"
      ? alunos
      : alunos.filter((aluno) => aluno.curso_id.includes(cursoIdSelecionado!));

  const columns = [
    { key: "id", label: "RA" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "curso_id", label: "Curso" },
    { key: "status", label: "Status" },
    { key: "semestre", label: "Semestre" },
    { key: "email", label: "Email" },
    {
      key: "acoes",
      label: "Ações",
      render: (aluno: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(aluno)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(aluno)}>
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Section>
      <Content>
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-medium mb-3 lg:mb-0">Lista de Alunos</h1>

          <div className="flex flex-wrap col-gap gap-2">
            <FilterSelect
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Aluno</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {alunosFiltrados.map((aluno) => (
            <Card key={aluno.id}>
              <CardHeader>
                <CardDescription>RA: {aluno.id}</CardDescription>
                <CardTitle className="text-lg">{aluno.nome}</CardTitle>
                <CardDescription>CPF: {aluno.cpf}</CardDescription>
                <CardDescription>Curso: {aluno.curso_id}</CardDescription>
                <CardDescription>Status: {aluno.status}</CardDescription>
                <CardDescription>Semestre: {aluno.semestre}</CardDescription>
                <CardDescription>Email: {aluno.email}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(aluno)}>
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(aluno)}
                >
                  <IconTrash /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <DataTable columns={columns} data={alunosFiltrados} />
        </div>

        <AlunoModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={alunoSelecionado}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          aluno={alunoSelecionado}
        />
      </Content>
    </Section>
  );
}
