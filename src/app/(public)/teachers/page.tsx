"use client";
import { Modal as TeacherModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { useTeachersHooks } from "@/hooks/teachers/actions";
import { GenericModal } from "@/components/generic-modal";
import { FilterSelect } from "./filter";
import { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCoursesFilter,
  useDisciplinaFilter,
} from "@/hooks/useCoursesFilter";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState("todos");
  const [status, setStatus] = useState("todos");
  const { getIdCurso } = useCoursesFilter();
  const { getIdDisciplina } = useDisciplinaFilter();

  const {
    teachers,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    professorSelecionado,
    deleteModalOpen,
    setDeleteModalOpen,
    composicaoOpen,
    setComposicaoOpen,
    verComposicaoCurricular,
    composicaoItems,
  } = useTeachersHooks();

  const professoresFiltrados = teachers.filter((prof) => {
    const cursoIdSelecionado = getIdCurso(cursoSelecionado);
    const disciplinaIdSelecionada = getIdDisciplina(disciplinaSelecionada);

    const filtraPorCurso =
      cursoSelecionado === "todos" ||
      prof.curso_id.includes(cursoIdSelecionado!);

    const filtraPorDisciplina =
      disciplinaSelecionada === "todos" ||
      prof.disciplinas_id.includes(disciplinaIdSelecionada!);

    const filtraPorStatus = status === "todos" || prof.status === status;

    return filtraPorCurso && filtraPorDisciplina && filtraPorStatus;
  });

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "email", label: "Email" },
    { key: "telefone", label: "Telefone" },
    { key: "status", label: "Status" },
    {
      key: "cursos",
      label: "Composição Curricular",
      render: (row: any) => (
        <Button onClick={() => verComposicaoCurricular(row)}>
          Ver Composição Curricular
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

  return (
    <Section>
      <Content>
        <div className="flex justify-between flex-wrap mb-6">
          <h1 className="text-2xl font-medium mb-2">Lista de Professores</h1>
          <div className="flex flex-wrap gap-2">
            <FilterSelect
              cursoSelecionado={cursoSelecionado}
              disciplinaSelecionada={disciplinaSelecionada}
              onDisciplinaChange={setDisciplinaSelecionada}
              onCursoChange={setCursoSelecionado}
              statusSelecionado={status}
              onStatusChange={setStatus}
            />
            <Button onClick={handleAdd}>Adicionar Professor</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {professoresFiltrados.map((professor) => (
            <Card key={professor.id}>
              <CardHeader>
                <CardTitle className="text-lg">{professor.nome}</CardTitle>
                <CardDescription>ID: {professor.id}</CardDescription>
                <CardDescription>CPF: {professor.cpf}</CardDescription>
                <CardDescription>Email: {professor.email}</CardDescription>
                <CardDescription>
                  Telefone: {professor.telefone}
                </CardDescription>
                <CardDescription>Status: {professor.status}</CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(professor)}>
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(professor)}
                >
                  <IconTrash /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <DataTable columns={columns} data={professoresFiltrados} />
        </div>

        {/* Modais */}
        <TeacherModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={professorSelecionado}
          onSave={handleSave}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          professor={professorSelecionado}
        />

        {/* Composição Curricular */}
        <GenericModal
          open={composicaoOpen}
          onOpenChange={setComposicaoOpen}
          title="Composição Curricular"
          description={[
            `Veja os dados relacionados a ${professorSelecionado?.nome}`,
          ]}
          items={composicaoItems}
        />
      </Content>
    </Section>
  );
}
