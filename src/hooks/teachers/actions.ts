import { useEffect, useState } from "react";
import { useTeachers } from "./useTeachers";
import { Curso, Disciplina, Professor as Teacher } from "@/lib/types";

export function useTeachersHooks() {
  const { teachers, cadastrarTeacher, editarTeacher, excluirTeacher } =
    useTeachers();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] =
    useState<Teacher | null>(null);

  const [composicaoOpen, setComposicaoOpen] = useState(false);
  const [todosCursos, setTodosCursos] = useState<Curso[]>([]);
  const [todasDisciplinas, setTodasDisciplinas] = useState<Disciplina[]>([]);
  const [composicaoItems, setComposicaoItems] = useState<string[]>([]);

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

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setTodosCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Disciplina[]) => setTodasDisciplinas(data))
      .catch((err) => console.error("Erro ao buscar disciplinas:", err));
  }, []);
  

  const verComposicaoCurricular = (professor: Teacher) => {
    setProfessorSelecionado(professor);
  
    if (Array.isArray(professor.curso_id) && Array.isArray(professor.disciplinas_id)) {
      const items = professor.curso_id.map((cursoId, index) => {
        const disciplinaId = professor.disciplinas_id[index];
  
        const curso = todosCursos.find(c => c.id === cursoId);
        const disciplina = todasDisciplinas.find(d => d.id === disciplinaId);
  
        return `Disciplina: ${disciplina?.nome ?? 'Desconhecida'} - Curso: ${curso?.nome_curso ?? 'Desconhecido'}`;
      });
  
      setComposicaoItems(items);
    } else {
      setComposicaoItems([]);
    }
  
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
    composicaoItems,
    composicaoOpen,
    setComposicaoOpen,
    verComposicaoCurricular,
  };
}
