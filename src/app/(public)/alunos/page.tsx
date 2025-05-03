"use client";
import { useState } from "react";
import { useAlunos } from "@/hooks/useAlunos";
import { AlunoModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { Aluno } from "@/lib/types";

export default function Page() {
  const { alunos, cadastrarAluno, editarAluno, excluirAluno } = useAlunos();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);

  const handleAdd = () => {
    setAlunoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setModalOpen(true);
  };

  const handleDelete = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (alunoSelecionado?.id) {
      await excluirAluno(alunoSelecionado.id);
      setDeleteModalOpen(false);
      setAlunoSelecionado(null);
    }
  };

  const handleSave = async (aluno: any) => {
    if (aluno.id) {
      await editarAluno(aluno.id, aluno);
    } else {
      await cadastrarAluno(aluno);
    }
    setModalOpen(false);
    setAlunoSelecionado(null);
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium">Lista de Alunos</h1>
          <Button onClick={handleAdd}>Adicionar Aluno</Button>
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
