import { useState } from "react";
import { useTeachers } from "./useTeachers";
import { Professor as Teacher } from "@/lib/types";

export function useTeachersHooks() {
  const { teachers, cadastrarTeacher, editarTeacher, excluirTeacher } =
    useTeachers();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] =
    useState<Teacher | null>(null);

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

  return {
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
  };
}
