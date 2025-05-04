"use client";
import { Modal as TeacherModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { useTeachersHooks } from "@/hooks/teachers/actions";
import { GenericModal } from "@/components/generic-modal";

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
    composicaoOpen,
    setComposicaoOpen,
    verComposicaoCurricular,
  } = useTeachersHooks();

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

  const data = teachers.map((professor) => ({
    ...professor,
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

        <GenericModal
          open={composicaoOpen}
          onOpenChange={setComposicaoOpen}
          title="Composição Curricular"
          items={
            Array.isArray(professorSelecionado?.curso_id) &&
            Array.isArray(professorSelecionado?.disciplinas_id)
              ? professorSelecionado.curso_id.map(
                  (curso: number, index: number) => {
                    const disciplina =
                      professorSelecionado?.disciplinas_id?.[index];
                    return `Disciplina: ${disciplina} - Curso: ${curso} `;
                  }
                )
              : []
          }
        />
      </Content>
    </Section>
  );
}
