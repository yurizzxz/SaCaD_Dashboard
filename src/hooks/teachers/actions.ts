import { useState } from "react";
import { useTeachers } from "./useTeachers";
import { Professor as Teacher } from "@/lib/types";

export function useTeachersHooks() {
  const { teachers, cadastrarTeacher, editarTeacher, excluirTeacher } = useTeachers();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState<Teacher | null>(null);
  
  const [composicaoOpen, setComposicaoOpen] = useState(false); // Novo estado para o modal de composição curricular

  const handleAdd = () => {
    setProfessorSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (professor: Teacher) => {
    setProfessorSelecionado(professor);
    setModalOpen(true);
  };

  const handleDelete = (professor: Teacher) => {
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

  const handleSave = async (professor: Teacher) => {
    if (professor.id) {
      await editarTeacher(professor.id, professor);
    } else {
      await cadastrarTeacher(professor);
    }
    setModalOpen(false);
    setProfessorSelecionado(null);
  };

  const verComposicaoCurricular = (professor: Teacher) => {
    setProfessorSelecionado(professor);
    setComposicaoOpen(true);
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
    deleteModalOpen,
    setDeleteModalOpen,
    professorSelecionado,

    composicaoOpen,
    setComposicaoOpen,
    verComposicaoCurricular,
  };
}
