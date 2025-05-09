"use client";
import { Content, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Modal as CursoModal } from "./actions/create-modal";
import { FilterSelect } from "./filter";
import { useCoursesHooks } from "@/hooks/courses/actions";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Page() {
  const [eixoSelecionado, setEixoSelecionado] = useState("todos");

  const {
    cursos,
    loading,
    error,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    cursoSelecionado,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
  } = useCoursesHooks();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_curso", label: "Nome" },
    { key: "sigla", label: "Sigla" },
    { key: "area_tecnologica", label: "Eixo Tecnológico" },
    { key: "periodo", label: "Turno" },
    { key: "modalidade", label: "Modalidade" },
    { key: "forma_oferecimento", label: "Oferecimento" },
    { key: "email_coordenador", label: "Email Coordenador" },
    {
      key: "disciplinas_id",
      label: "Disciplinas",
      render: (curso: any) => (
        <span>
          {Array.isArray(curso.disciplinas_id)
            ? curso.disciplinas_id.length
            : 0}
        </span>
      ),
    },
    { key: "duracao_em_semestres", label: "Semestres" },
    {
      key: "acoes",
      label: "Ações",
      render: (curso: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(curso)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(curso)}>
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = cursos
    .filter(
      (curso) =>
        eixoSelecionado === "todos" ||
        curso.area_tecnologica === eixoSelecionado
    )
    .map((curso) => ({
      ...curso,
      id: curso.id,
      disciplinas_id: curso.disciplinas_id,
    }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>
          <div className="flex items-center flex-wrap gap-2">
            <FilterSelect
              eixoSelecionado={eixoSelecionado}
              onEixoChange={setEixoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Curso</Button>
          </div>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {data.map((curso) => (
            <Card key={curso.id}>
              <CardHeader>
                <CardDescription>ID: {curso.id}</CardDescription>
                <CardTitle className="text-lg">{curso.nome_curso}</CardTitle>
                <CardDescription>Sigla: {curso.sigla}</CardDescription>
                <CardDescription>
                  Eixo: {curso.area_tecnologica}
                </CardDescription>
                <CardDescription>Turno: {curso.periodo}</CardDescription>
                <CardDescription>
                  Modalidade: {curso.modalidade}
                </CardDescription>
                <CardDescription>
                  Oferecimento: {curso.forma_oferecimento}
                </CardDescription>
                <CardDescription>
                  Email: {curso.email_coordenador}
                </CardDescription>
                <CardDescription>
                  Disciplinas: {curso.disciplinas_id}
                </CardDescription>
                <CardDescription>
                  Semestres: {curso.duracao_em_semestres}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button variant="default" onClick={() => handleEdit(curso)}>
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(curso)}
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

        <CursoModal
          open={modalOpen}
          setOpen={setModalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          initialData={cursoSelecionado}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          curso={cursoSelecionado}
        />
      </Content>
    </Section>
  );
}
