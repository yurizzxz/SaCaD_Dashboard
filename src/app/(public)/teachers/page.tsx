"use client";
import { useState } from "react";
import { useTeachers } from "@/hooks/useTeachers";
import { Modal as TeacherModal } from "./actions/create-modal"; 
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { Professor as Teacher } from "@/lib/types";

export default function Page() {
  const { teachers, cadastrarTeacher, editarTeacher, excluirTeacher } = useTeachers();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState<Teacher | null>(null);

  const handleAdd = () => {
    setProfessorSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (professor: any) => {
    setProfessorSelecionado(professor);
    setModalOpen(true);
  };

  const handleDelete = (professor: any) => {
    setProfessorSelecionado(professor);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (professorSelecionado?.id) {
      await excluirTeacher(professorSelecionado.id);
      setDeleteModalOpen(false);
      setProfessorSelecionado(null);
    }
  };

  const handleSave = async (professor: any) => {
    if (professor.id) {
      await editarTeacher(professor.id, professor);
    } else {
      await cadastrarTeacher(professor);
    }
    setModalOpen(false);
    setProfessorSelecionado(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "disciplina", label: "Disciplina" },
    { key: "cursos", label: "Cursos" },
    { key: "email", label: "Email" },
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

  const data = teachers.map((professor) => ({
    ...professor,
    cursos: professor.cursos
      .map((curso) => `${curso.nome_curso} - Semestre ${curso.semestre}`)
      .join(", "),
  }));

  return (
    <Section>
      <Content>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Professores</h1>
          <Button onClick={handleAdd}>Adicionar Professor</Button>
        </div>

        <DataTable columns={columns} data={data} />

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
      </Content>
    </Section>
  );
}
