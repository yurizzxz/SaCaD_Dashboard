import { Tecnico } from "@/lib/types";
import { useState } from "react";
import { useTecnicos } from "./useTecnicos";

export const useTecnicoHooks = () => {
  const { tecnicos, cadastrarTecnico, editarTecnico, excluirTecnico } = useTecnicos();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tecnicoSelecionado, setTecnicoSelecionado] = useState<Tecnico | null>(null);

  const handleAdd = () => {
    setTecnicoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (tecnico: Tecnico) => {
    setTecnicoSelecionado(tecnico);
    setModalOpen(true);
  };

  const handleDelete = (tecnico: Tecnico) => {
    setTecnicoSelecionado(tecnico);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (tecnicoSelecionado?.id) {
      await excluirTecnico(tecnicoSelecionado.id);
      setDeleteModalOpen(false);
      setTecnicoSelecionado(null);
    }
  };

  const handleSave = async (tecnico: Tecnico) => {
    if (tecnico.id) {
      await editarTecnico(tecnico.id, tecnico);
    } else {
      await cadastrarTecnico(tecnico);
    }
    setModalOpen(false);
    setTecnicoSelecionado(null);
  };

  return {
    tecnicos,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    tecnicoSelecionado,
    setTecnicoSelecionado,
  };
};
