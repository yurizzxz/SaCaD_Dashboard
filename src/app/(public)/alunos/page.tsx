"use client";

import { AlunoModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { FilterSelect } from "./filter";
import { useAlunoHooks } from "@/hooks/alunos/actions";

export default function Page() {
  const { alunos,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    alunoSelecionado,
  } = useAlunoHooks();

  const columns = [
    { key: "ra", label: "RA" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "curso", label: "Curso" },
    { key: "status", label: "Status" },
    { key: "semestre", label: "Semestre" },
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

  const data = alunos.map((aluno) => ({
    ...aluno,
    ra: aluno.id,
  }));

  return (
    <Section>
      <Content>
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-medium">Lista de Alunos</h1>

          <div className="flex flex-wrap gap-2">
            <FilterSelect />
            <Button onClick={handleAdd}>Adicionar Aluno</Button>
          </div>
        </div>

        <DataTable columns={columns} data={data} />

        <AlunoModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={alunoSelecionado}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          aluno={alunoSelecionado}
        />
      </Content>
    </Section>
  );
}


