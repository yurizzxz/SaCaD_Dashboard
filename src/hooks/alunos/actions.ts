import { Aluno } from "@/lib/types";
import { useState } from "react";
import { useAlunos } from "./useAlunos";

export const useAlunoHooks = () => {
  const { alunos, cadastrarAluno, editarAluno, excluirAluno } = useAlunos();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);

  const handleAdd = () => {
    setAlunoSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setModalOpen(true);
  };

  const handleDelete = (aluno: any) => {
    setAlunoSelecionado(aluno);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (alunoSelecionado?.id) {
      await excluirAluno(alunoSelecionado.id);
      setDeleteModalOpen(false);
      setAlunoSelecionado(null);
    }
  };

  const handleSave = async (aluno: any) => {
    if (aluno.id) {
      await editarAluno(aluno.id, aluno);
    } else {
      await cadastrarAluno(aluno);
    }
    setModalOpen(false);
    setAlunoSelecionado(null);
  };

  return {
    alunos,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    alunoSelecionado,
    setAlunoSelecionado,
  }
};
