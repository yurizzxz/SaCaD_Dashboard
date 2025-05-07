"use client";

import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Modal as SalaModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Curso, Sala } from "@/lib/types";
import { useSalasHooks } from "@/hooks/salas/actions";
import { FilterSelect } from "./filter";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useCoursesFilter } from "@/hooks/useCoursesFilter";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const { cursos, getNomeCurso, getIdCurso } = useCoursesFilter();

  const {
    salas,
    loading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    salaSelecionada,
    setSalaSelecionada,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useSalasHooks();

  const cursoIdSelecionado = getIdCurso(cursoSelecionado);

  const salasFiltradas =
    cursoSelecionado === "todos"
      ? salas
      : salas.filter((salas) =>
          salas.curso_associado.includes(String(cursoIdSelecionado))
        );

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_sala", label: "Nome da Sala" },
    {
      key: "capacidade",
      label: "Capacidade",
      render: (row: any) => <>{row.capacidade} Alunos</>,
    },
    { key: "predio", label: "Prédio" },
    { key: "bloco", label: "Bloco" },
    { key: "curso_associado", label: "Curso Associado", render: (row: any) => getNomeCurso(row.curso_associado) },
    {
      key: "equipamentosString",
      label: "Equipamentos",
      render: (row: any) => (
        <Button variant="default" onClick={() => handleEdit(row)}>
          Ver Equipamentos
        </Button>
      ),
    },
    {
      key: "acoes",
      label: "Ações",
      render: (row: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(row)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(row)}>
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = salas.map((sala: Sala) => ({
    id: sala.id,
    nome_sala: sala.nome_sala,
    capacidade: sala.capacidade,
    curso_associado: sala.curso_associado,
    predio: sala.predio,
    bloco: sala.bloco,
    equipamentosString: Object.entries(sala.equipamentos || {})
      .filter(([equip, qtd]) => equip && qtd > 0)
      .map(([equip, qtd]: [string, number]) => `${equip}: ${qtd}`)
      .join(", "),
    equipamentos: sala.equipamentos,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Salas</h1>
          <div className="flex gap-2 flex-wrap">
            <FilterSelect
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Sala</Button>
          </div>
        </div>

        {loading && <p>Carregando salas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
              {data.map((sala) => (
                <Card key={sala.id}>
                  <CardHeader>
                    <CardDescription>ID: {sala.id}</CardDescription>
                    <CardTitle className="text-lg">{sala.nome_sala}</CardTitle>
                    <CardDescription>
                      Capacidade: {sala.capacidade} alunos
                    </CardDescription>
                    <CardDescription>Prédio: {sala.predio}</CardDescription>
                    <CardDescription>Bloco: {sala.bloco}</CardDescription>
                    <CardDescription>
                      Curso: {sala.curso_associado}
                    </CardDescription>
                    <CardDescription>
                      Equipamentos: {sala.equipamentosString || "Nenhum"}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="gap-2">
                    <Button variant="default" onClick={() => handleEdit(sala)}>
                      <IconEdit /> Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(sala)}
                    >
                      <IconTrash /> Excluir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="hidden lg:block">
              <DataTable columns={columns} data={salasFiltradas} />
            </div>
          </>
        )}

        <SalaModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={salaSelecionada}
          onSave={handleSave}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          sala={salaSelecionada}
        />
      </Content>
    </Section>
  );
}
