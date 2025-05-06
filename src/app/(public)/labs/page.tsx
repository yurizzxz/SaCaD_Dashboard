"use client";

import { Content, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal as LabModal } from "./actions/create-modal";
import { Curso, Laboratorio as Lab } from "@/lib/types";
import { useLabsHooks } from "@/hooks/labs/actions";
import { DataTable } from "@/components/table/data-table";
import { FilterSelect } from "./filter";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  useState } from "react";
import { useCoursesFilter } from "@/hooks/useCoursesFilter";

interface LaboratorioTable extends Lab {
  equipamentosString: string;
}

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const { cursos, getNomeCurso, getIdCurso } = useCoursesFilter();


  const {
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    labs,
    loadingLabs,
    errorLabs,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    labSelecionado,
  } = useLabsHooks();

  const cursoIdSelecionado = getIdCurso(cursoSelecionado);

  const labsFiltrados =
    cursoSelecionado === "todos"
      ? labs
      : labs.filter((labs) =>
          labs.curso_associado.includes(String(cursoIdSelecionado))
        );

  const columns: any = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome do Laboratório" },
    {
      key: "capacidade",
      label: "Capacidade",
      render: (row: any) => <>{row.capacidade} Alunos</>,
    },
    { key: "predio", label: "Prédio" },
    { key: "bloco", label: "Bloco" },
    {
      key: "curso_associado",
      label: "Curso Associado",
      render: (row: any) => getNomeCurso(row.curso_associado),
    },
    {
      key: "equipamentosString",
      label: "Equipamentos",
      render: (lab: LaboratorioTable) => (
        <Button variant="default" onClick={() => handleEdit(lab)}>
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

  const data: LaboratorioTable[] = labsFiltrados.map((sala: Lab) => ({
    ...sala,
    equipamentosString: Object.entries(sala.equipamentos || {})
      .filter(([equip, qtd]) => equip && qtd > 0)
      .map(([equip, qtd]: [string, number]) => `${equip}: ${qtd}`)
      .join(", "),
  }));
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Laboratórios</h1>
          <div className="flex gap-2 flex-wrap">
            <FilterSelect
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Laboratório</Button>
          </div>
        </div>

        {loadingLabs && <p>Carregando laboratórios...</p>}
        {errorLabs && <p className="text-red-500">{errorLabs}</p>}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {data.map((lab) => (
            <Card key={lab.id}>
              <CardHeader>
                <CardDescription>ID: {lab.id}</CardDescription>
                <CardTitle className="text-lg">{lab.nome}</CardTitle>
                <CardDescription>
                  Capacidade: {lab.capacidade} alunos
                </CardDescription>
                <CardDescription>Prédio: {lab.predio}</CardDescription>
                <CardDescription>Bloco: {lab.bloco}</CardDescription>
                <CardDescription>Curso: {lab.curso_associado}</CardDescription>
                <CardDescription>
                  Equipamentos: {lab.equipamentosString || "Nenhum"}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(lab)}>
                  <IconEdit /> Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(lab)}>
                  <IconTrash /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <DataTable columns={columns} data={data} />
        </div>

        <LabModal
          open={modalOpen}
          setOpen={setModalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          initialData={labSelecionado}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onConfirm={confirmDelete}
          onOpenChange={setDeleteModalOpen}
          sala={labSelecionado}
        />
      </Content>
    </Section>
  );
}
