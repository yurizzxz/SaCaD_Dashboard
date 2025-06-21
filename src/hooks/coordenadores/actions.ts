import { Coordenador } from "@/types/types";
import { useState } from "react";
import { useCoordenadores } from "./useCoordenadores";

export const useCoordenadorHooks = () => {
  const { coordenadores, cadastrarCoordenador, editarCoordenador, excluirCoordenador } = useCoordenadores();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState<Coordenador | null>(null);

  const handleAdd = () => {
    setCoordenadorSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (coordenador: Coordenador) => {
    setCoordenadorSelecionado(coordenador);
    setModalOpen(true);
  };

  const handleDelete = (coordenador: Coordenador) => {
    setCoordenadorSelecionado(coordenador);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (coordenadorSelecionado?.id) {
      await excluirCoordenador(coordenadorSelecionado.id);
      setDeleteModalOpen(false);
      setCoordenadorSelecionado(null);
    }
  };

  const handleSave = async (coordenador: Coordenador) => {
    if (coordenador.id) {
      await editarCoordenador(coordenador.id, coordenador);
    } else {
      await cadastrarCoordenador(coordenador);
    }
    setModalOpen(false);
    setCoordenadorSelecionado(null);
  };

  return {
    coordenadores,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    coordenadorSelecionado,
    setCoordenadorSelecionado,
  };
};
