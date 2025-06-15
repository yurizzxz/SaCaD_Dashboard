import { Horario, Professor } from "@/lib/types";
import { useEffect, useState } from "react";
import { useHorarios } from "./useHorarios";

export const useHorarioHooks = () => {
  const { horarios, cadastrarHorario, editarHorario, excluirHorario } =
    useHorarios();
  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([]);
  const [modalProfessoresOpen, setModalProfessoresOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [professoresSelecionados, setProfessoresSelecionados] = useState<
    string[]
  >([]);
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

  useEffect(() => {
    fetch("http://localhost:99/professores")
      .then((res) => res.json())
      .then((data) => setTodosProfessores(data));
  }, []);

  const verProfessores = (professoresIds: number[]) => {
    const nomes = professoresIds.map((id) => {
      const professor = todosProfessores.find((p) => p.id === id);
      return professor ? professor.nome : "Desconhecido";
    });
    setProfessoresSelecionados(nomes);
    setModalProfessoresOpen(true);
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
    setModalProfessoresOpen,
    modalProfessoresOpen,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    verProfessores,
    professoresSelecionados,
    setProfessoresSelecionados,
    setDeleteModalOpen,
    horarioSelecionado,
    setHorarioSelecionado,
  };
};
