"use client";
import { useState } from "react";
import { useDisciplinas } from "@/hooks/useDisciplina";
import { Modal as DisciplinaModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { Disciplina } from "@/lib/types";

export default function Page() {
  const {
    disciplinas,
    cadastrarDisciplina,
    editarDisciplina,
    excluirDisciplina,
    loading,
    error,
  } = useDisciplinas();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    useState<Disciplina | null>(null);

  const handleAdd = () => {
    setDisciplinaSelecionada(null);
    setModalOpen(true);
  };

  const handleEdit = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setModalOpen(true);
  };

  const handleDelete = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (disciplinaSelecionada?.id) {
      await excluirDisciplina(disciplinaSelecionada.id);
      setDeleteModalOpen(false);
      setDisciplinaSelecionada(null);
    }
  };

  const handleSave = async (disciplina: any) => {
    if (disciplina.id) {
      await editarDisciplina(disciplina.id, disciplina);
    } else {
      await cadastrarDisciplina(disciplina);
    }
    setModalOpen(false);
    setDisciplinaSelecionada(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "sigla", label: "Sigla" },
    { key: "semestre", label: "Semestre" },
    { key: "professor", label: "Professor" },
    { key: "curso", label: "Curso" },
    { key: "area_tecnologica", label: "Eixo Tecnológico" },
    { key: "aulas_teoricas", label: "Aulas Teóricas" },
    { key: "aulas_praticas", label: "Aulas Práticas" },
    { key: "modalidade", label: "Modalidade" },
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

  const data = disciplinas.map((disciplina: Disciplina) => ({
    id: disciplina.id,
    nome: disciplina.nome,
    professor: Array.isArray(disciplina.professor)
      ? disciplina.professor.join(", ")
      : "",
    curso: disciplina.curso,
    area_tecnologica: disciplina.area_tecnologica,
    aulas_teoricas: disciplina.aulas_teoricas,
    aulas_praticas: disciplina.aulas_praticas,
    modalidade: disciplina.modalidade,
    semestre: disciplina.semestre,
    qtd_aulas: disciplina.qtd_aulas,
    sigla: disciplina.sigla,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Disciplinas</h1>
          <Button onClick={handleAdd}>Criar Disciplina</Button>
        </div>

        {loading && <p>Carregando disciplinas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}

        <DisciplinaModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={disciplinaSelecionada}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          disciplina={disciplinaSelecionada}
        />
      </Content>
    </Section>
  );
}
