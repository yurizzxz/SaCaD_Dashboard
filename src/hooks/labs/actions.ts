import { useState } from "react";
import { useLabs } from "./useLabs";
import { Laboratorio as Lab } from "@/lib/types";

export function useLabsHooks() {
  const {
    labs,
    loading: loadingLabs,
    error: errorLabs,
    cadastrarLab,
    editarLab,
    excluirLab,
  } = useLabs();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [labSelecionado, setLabSelecionado] = useState<Lab | null>(null);

  const handleAdd = () => {
    setLabSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (lab: Lab) => {
    setLabSelecionado(lab);
    setModalOpen(true);
  };

  const handleDelete = (lab: Lab) => {
    setLabSelecionado(lab);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (labSelecionado?.id) {
      await excluirLab(labSelecionado.id);
      setDeleteModalOpen(false);
      setLabSelecionado(null);
    }
  };

  const handleSave = async (lab: Lab) => {
    if (lab.id) {
      await editarLab(lab.id, lab);
    } else {
      await cadastrarLab(lab);
    }
    setModalOpen(false);
    setLabSelecionado(null);
  };

  return {
    labs,
    loadingLabs,
    errorLabs,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    labSelecionado,
    setLabSelecionado,
  };
}
