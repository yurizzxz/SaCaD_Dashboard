"use client";

import { TecnicoModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTecnicoHooks } from "@/hooks/tecnicos/actions";
import { FilterSelect } from "./filter";
import { useState } from "react";

export default function Page() {
  const [statusSelecionado, setStatusSelecionado] = useState("todos");

  const {
    tecnicos,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    tecnicoSelecionado,
  } = useTecnicoHooks();

  const tecnicosFiltrados = tecnicos.filter((tecnico) => {
    const statusFiltro =
      statusSelecionado === "todos" || tecnico.status === statusSelecionado;

    return statusFiltro;
  });

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "telefone", label: "Telefone" },
    { key: "status", label: "Status" },
    {
      key: "setor",
      label: "Setor",
      render: (tecnico: any) => tecnico.setor,
    },
    { key: "email", label: "Email" },
    {
      key: "acoes",
      label: "Ações",
      render: (tecnico: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(tecnico)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(tecnico)}>
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = tecnicosFiltrados.map((tecnico: any) => ({
    ...tecnico,
  }));

  return (
    <Section>
      <Content>
        <div className="flex justify-between flex-wrap items-center mb-6">
          <div className="flex flex-wrap items-center col-gap gap-2">
            <FilterSelect
              statusSelecionado={statusSelecionado}
              onStatusChange={setStatusSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Técnico</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setStatusSelecionado("todos");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {data.map((tecnico) => (
            <Card key={tecnico.id}>
              <CardHeader>
                <CardDescription>RA: {tecnico.id}</CardDescription>
                <CardTitle className="text-lg">{tecnico.nome}</CardTitle>
                <CardDescription>CPF: {tecnico.cpf}</CardDescription>
                <CardDescription>Setor: {tecnico.setor}</CardDescription>
                <CardDescription>Email: {tecnico.email}</CardDescription>
                <CardDescription>Telefone: {tecnico.telefone}</CardDescription>
                <CardDescription>Status: {tecnico.status}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(tecnico)}>
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(tecnico)}
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

        <TecnicoModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={tecnicoSelecionado}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          tecnico={tecnicoSelecionado}
        />
      </Content>
    </Section>
  );
}
