"use client";

import { CoordenadorModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { FilterSelect } from "./filter";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCoursesFilter } from "@/hooks/useCoursesFilter";
import { useCoordenadorHooks } from "@/hooks/coordenadores/actions";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const { cursos, getNomeCurso, getIdCurso } = useCoursesFilter();

  const {
    coordenadores,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    coordenadorSelecionado,
  } = useCoordenadorHooks();

  const cursoIdSelecionado = getIdCurso(cursoSelecionado);

  const coordenadoresFiltrados =
    cursoSelecionado === "todos"
      ? coordenadores
      : coordenadores.filter((coordenador) => coordenador.curso_id.includes(cursoIdSelecionado!));

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    {
      key: "curso_id",
      label: "Curso",
      render: (coordenador: any) => getNomeCurso(coordenador.curso_id),
    },
    { key: "email", label: "Email" },
    {
      key: "acoes",
      label: "Ações",
      render: (coordenador: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(coordenador)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(coordenador)}>
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
          <div className="flex flex-wrap col-gap gap-2">
            <FilterSelect
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Coordenador</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {coordenadoresFiltrados.map((coordenador) => (
            <Card key={coordenador.id}>
              <CardHeader>
                <CardDescription>RA: {coordenador.id}</CardDescription>
                <CardTitle className="text-lg">{coordenador.nome}</CardTitle>
                <CardDescription>CPF: {coordenador.cpf}</CardDescription>
                <CardDescription>Curso: {coordenador.curso_id}</CardDescription>

                <CardDescription>Email: {coordenador.email}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(coordenador)}>
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(coordenador)}
                >
                  <IconTrash /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <DataTable columns={columns} data={coordenadoresFiltrados} />
        </div>

        <CoordenadorModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={coordenadorSelecionado}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          coordenador={coordenadorSelecionado}
        />
      </Content>
    </Section>
  );
}
