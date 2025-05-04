import { useState } from "react";
import { useDisciplinas } from "@/hooks/disciplina/useDisciplina";
import { Disciplina } from "@/lib/types";

export function useDisciplinaHooks() {
  const {
    disciplinas,
    cadastrarDisciplina,
    editarDisciplina,
    excluirDisciplina,
    loading,
    error,
  } = useDisciplinas();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalProfessoresOpen, setModalProfessoresOpen] = useState(false);
  const [modalCursosOpen, setModalCursosOpen] = useState(false);
  const [professoresSelecionados, setProfessoresSelecionados] = useState<string[]>([]);
  const [cursosSelecionados, setCursosSelecionados] = useState<string[]>([]);

  const [modalCargaHorariaOpen, setModalCargaHorariaOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | null>(null);

  const handleAdd = () => {
    setDisciplinaSelecionada(null);
    setModalOpen(true);
  };

  const handleEdit = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setModalOpen(true);
  };

  const handleDelete = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (disciplinaSelecionada?.id) {
      await excluirDisciplina(disciplinaSelecionada.id);
      setDeleteModalOpen(false);
      setDisciplinaSelecionada(null);
    }
  };

  const verProfessores = (professores: string[]) => {
    setProfessoresSelecionados(professores);
    setModalProfessoresOpen(true);
  };

  const verCursos = (cursos: string[]) => {
    setCursosSelecionados(cursos);
    setModalCursosOpen(true);
  };

  const verCargaHoraria = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setModalCargaHorariaOpen(true);
  };

  const handleSave = async (disciplina: any) => {
    if (disciplina.id) {
      await editarDisciplina(disciplina.id, disciplina);
    } else {
      await cadastrarDisciplina(disciplina);
    }
    setModalOpen(false);
    setDisciplinaSelecionada(null);
  };

  return {
    disciplinas,
    loading,
    error,
    modalOpen,
    setModalOpen,
    modalProfessoresOpen,
    setModalProfessoresOpen,
    modalCursosOpen,
    setModalCursosOpen,
    professoresSelecionados,
    cursosSelecionados,
    deleteModalOpen,
    setDeleteModalOpen,
    disciplinaSelecionada,
    setDisciplinaSelecionada,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    verProfessores,
    verCursos,
    verCargaHoraria,
    handleSave,
    modalCargaHorariaOpen,
    setModalCargaHorariaOpen,
  };
}
