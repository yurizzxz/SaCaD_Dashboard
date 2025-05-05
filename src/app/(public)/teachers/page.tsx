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
import { Curso } from "@/lib/types";
import { useState, useEffect } from "react";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const [cursos, setCursos] = useState<Curso[]>([]);

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
    composicaoItems
  } = useTeachersHooks();

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const cursoIdSelecionado = cursos.find(
    (curso) => curso.nome_curso === cursoSelecionado
  )?.id;

  const professoresFiltrados =
    cursoSelecionado === "todos"
      ? teachers
      : teachers.filter((prof) => prof.curso_id.includes(cursoIdSelecionado!));

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
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-medium">Lista de Professores</h1>
          <div className="flex flex-wrap gap-2">
            <FilterSelect
              cursoSelecionado={cursoSelecionado}
              onCursoChange={setCursoSelecionado}
            />
            <Button onClick={handleAdd}>Adicionar Professor</Button>
          </div>
        </div>

        <DataTable columns={columns} data={professoresFiltrados} />

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
          description={[`Veja os dados relacionados a ${professorSelecionado?.nome}`]}

          items={composicaoItems}
        />
      </Content>
    </Section>
  );
}
