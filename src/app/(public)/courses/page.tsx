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
  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>
          <Button onClick={handleAdd}>Adiconar Curso</Button>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!loading &&
            !error &&
            cursos.map((curso: any) => (
              <Card key={curso.id} className="border rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {curso.nome}
                  </CardTitle>
                  <CardDescription>
                    {curso.duracao_em_semestres} semestres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Disciplinas:</strong>{" "}
                    {curso.disciplinas?.length > 0
                      ? `${
                          curso.disciplinas.length
                        } disciplina(s): ${curso.disciplinas
                          .map((d: any) => d.nome)
                          .join(", ")}`
                      : "Sem disciplinas"}
                  </p>
                  <p>
                    <strong>Status:</strong> {curso.status || "Ativo"}
                  </p>
                  <p>
                    <strong>Email do Coordenador:</strong>{" "}
                    {curso.email_coordenador || "Não informado"}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(curso)}>
                      <IconEdit />
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(curso)}>
                      <IconTrash />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
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
