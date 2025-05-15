import { Horario } from "@/lib/types";
import { useState } from "react";
import { useHorarios } from "./useHorarios";

export const useHorarioHooks = () => {
  const { horarios, cadastrarHorario, editarHorario, excluirHorario } =
    useHorarios();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<Horario | null>(
    null
  );

  const handleAdd = () => {
    setHorarioSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (horario: Horario) => {
    setHorarioSelecionado(horario);
    setModalOpen(true);
  };

  const handleDelete = (horario: Horario) => {
    setHorarioSelecionado(horario);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (horarioSelecionado?.id) {
      await excluirHorario(horarioSelecionado.id);
      setDeleteModalOpen(false);
      setHorarioSelecionado(null);
    }
  };

  const handleSave = async (horario: Partial<Horario>) => {
    if (horario.id) {
      await editarHorario(horario.id, horario);
    } else {
      await cadastrarHorario(horario);
    }
    setModalOpen(false);
    setHorarioSelecionado(null);
  };

  return {
    horarios,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    horarioSelecionado,
    setHorarioSelecionado,
  };
};
