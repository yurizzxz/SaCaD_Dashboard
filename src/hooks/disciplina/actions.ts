import { useEffect, useState } from "react";
import { useDisciplinas } from "@/hooks/disciplina/useDisciplina";
import { Disciplina, Curso, Professor } from "@/lib/types";

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
  const [professoresSelecionados, setProfessoresSelecionados] = useState<
    string[]
  >([]);
  const [cursosSelecionados, setCursosSelecionados] = useState<string[]>([]);

  const [todosProfessores, setTodosProfessores] = useState<Professor[]>([]);
  const [todosCursos, setTodosCursos] = useState<Curso[]>([]);

  const [modalCargaHorariaOpen, setModalCargaHorariaOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    useState<Disciplina | null>(null);

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

  useEffect(() => {
    fetch("http://localhost:99/professores")
      .then((res) => res.json())
      .then((data) => setTodosProfessores(data));

    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data) => setTodosCursos(data));
  }, []);
  const verProfessores = (professoresIds: number[]) => {
    const nomes = professoresIds.map((id) => {
      const professor = todosProfessores.find((p) => p.id === id);
      return professor ? professor.nome : "Desconhecido";
    });
    setProfessoresSelecionados(nomes);
    setModalProfessoresOpen(true);
  };

  const verCursos = (cursosIds: number[]) => {
    const nomes = cursosIds.map((id) => {
      const curso = todosCursos.find((c) => c.id === id);
      return curso ? curso.nome_curso : "Desconhecido";
    });
    setCursosSelecionados(nomes);
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
