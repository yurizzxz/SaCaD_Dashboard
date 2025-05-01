"use client";
import { Content, Section } from "@/components/section";
import { useCursos } from "@/hooks/useCourses";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Modal as CursoModal } from "./actions/create-modal";
import { Curso } from "@/lib/types";

export default function Page() {
  const { cursos, loading, error, excluirCurso, editarCurso, cadastrarCurso } =
    useCursos();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  const handleAdd = () => {
    setCursoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (curso: any) => {
    setCursoSelecionado(curso);
    setModalOpen(true);
  };

  const handleDelete = (curso: any) => {
    setCursoSelecionado(curso);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (cursoSelecionado?.id) {
      await excluirCurso(cursoSelecionado.id);
      setDeleteModalOpen(false);
      setCursoSelecionado(null);
    }
  };

  const handleSave = async (curso: any) => {
    if (curso.id) {
      await editarCurso(curso.id, curso);
    } else {
      await cadastrarCurso(curso);
    }
    setModalOpen(false);
    setCursoSelecionado(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "periodo", label: "Turno" },
    { key: "modalidade", label: "Modalidade" },
    { key: "forma_oferecimento", label: "Forma de Oferecimento" },
    { key: "email_coordenador", label: "Email Coordenador" },
    { key: "disciplinas", label: "Disciplinas", render: (row: any) => row.disciplinas?.length || 0 },
    { key: "duracao_em_semestres", label: "Semestres" },
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

  const data = cursos.map((cursos) => ({
    ...cursos,
    id: cursos.id,
  }));
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>
          <Button onClick={handleAdd}>Adiconar Curso</Button>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <DataTable columns={columns} data={data} />

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
