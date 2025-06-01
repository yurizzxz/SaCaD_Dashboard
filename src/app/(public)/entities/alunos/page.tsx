"use client";

import { AlunoModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { FilterSelect } from "./filter";
import { useAlunoHooks } from "@/hooks/alunos/actions";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCoursesFilter } from "@/hooks/useCoursesFilter";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const { getNomeCurso, getIdCurso } = useCoursesFilter();

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

  const cursoIdSelecionado = getIdCurso(cursoSelecionado);

  const alunosFiltrados = alunos.filter((aluno) => {
    const filtraPorCurso =
      cursoSelecionado === "todos" ||
      aluno.curso_id.includes(cursoIdSelecionado!);

    const filtraPorStatus =
      statusSelecionado === "todos" || aluno.status === statusSelecionado;

    return filtraPorCurso && filtraPorStatus;
  });

  const columns = [
    { key: "id", label: "RA" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    {
      key: "curso_id",
      label: "Curso",
      render: (aluno: any) => getNomeCurso(aluno.curso_id),
    },
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

  const data = alunosFiltrados.map((aluno) => ({
    ...aluno,
  }));

  return (
    <Section>
      <Content>
        <div className="flex justify-between flex-wrap items-center mb-6">
          <div className="flex flex-wrap items-center col-gap gap-2">
            <FilterSelect
              statusSelecionado={statusSelecionado}
              onStatusChange={setStatusSelecionado}
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Aluno</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setStatusSelecionado("todos");
                setCursoSelecionado("todos");
              }}
            >
              Limpar Filtros
            </Button>
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
          <DataTable columns={columns} data={data} />
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
