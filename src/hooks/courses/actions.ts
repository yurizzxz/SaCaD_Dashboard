import { Curso } from "@/lib/types";
import { useState } from "react";
import { useCursos } from "./useCourses";

export function useCoursesHooks() {
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

  return {
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
  };
}
