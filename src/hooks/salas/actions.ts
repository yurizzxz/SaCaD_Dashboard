import { Sala } from "@/lib/types";
import { useState } from "react";
import { useSalas } from "./useSalas";

export function useSalasHooks() {
  const { salas, loading, error, cadastrarSala, editarSala, excluirSala } =
    useSalas();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState<Sala | null>(null);

  const handleAdd = () => {
    setSalaSelecionada(null);
    setModalOpen(true);
  };

  const handleEdit = (sala: Sala) => {
    setSalaSelecionada(sala);
    setModalOpen(true);
  };

  const handleDelete = (sala: Sala) => {
    setSalaSelecionada(sala);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (salaSelecionada?.id) {
      await excluirSala(salaSelecionada.id);
      setDeleteModalOpen(false);
      setSalaSelecionada(null);
    }
  };

  const handleSave = async (sala: Sala) => {
    if (sala.id) {
      await editarSala(sala.id, sala);
    } else {
      await cadastrarSala(sala);
    }
    setModalOpen(false);
    setSalaSelecionada(null);
  };

  return {
    salas,
    loading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    salaSelecionada,
    setSalaSelecionada,
    deleteModalOpen,
    setDeleteModalOpen,
  };
}
