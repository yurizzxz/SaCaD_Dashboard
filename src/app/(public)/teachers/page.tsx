"use client";
import { useState } from "react";
import { useTeachers } from "@/hooks/teachers/useTeachers";
import { Modal as TeacherModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { Professor as Teacher } from "@/lib/types";
import { useTeachersHooks } from "@/hooks/teachers/actions";

export default function Page() {
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
  } = useTeachersHooks();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "email", label: "Email" },
    { key: "disciplina", label: "Disciplina" },
    { key: "cursos", label: "Cursos", render: (row: any) => row.cursos },

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
    cursos: Array.isArray(professor.cursos)
      ? professor.cursos
          .map((curso) => `${curso.nome_curso} - Semestre ${curso.semestre}`)
          .join(", ")
      : "",
  }));

  return (
    <Section>
      <Content>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Lista de Professores</h1>
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
