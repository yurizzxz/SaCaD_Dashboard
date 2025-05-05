"use client";
import { useDisciplinaHooks } from "@/hooks/disciplina/actions";
import { Modal as DisciplinaModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Section, Content } from "@/components/section";
import { Curso, Disciplina } from "@/lib/types";
import { GenericModal } from "@/components/generic-modal";
import { FilterSelect } from "./filter";
import { useEffect, useState } from "react";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const [cursos, setCursos] = useState<Curso[]>([]);

  const {
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
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    verProfessores,
    verCursos,
    handleSave,
    modalCargaHorariaOpen,
    setModalCargaHorariaOpen,
    verCargaHoraria,
  } = useDisciplinaHooks();

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const cursoIdSelecionado = cursos.find(
    (curso) => curso.nome_curso === cursoSelecionado
  )?.id;

  const disciplinasFiltradas =
    cursoSelecionado === "todos"
      ? disciplinas
      : disciplinas.filter((disciplina) =>
          disciplina.curso_id.includes(cursoIdSelecionado!)
        );

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "sigla", label: "Sigla" },
    { key: "semestre", label: "Semestre" },
    { key: "area_tecnologica", label: "Eixo Tecnológico" },
    { key: "modalidade", label: "Modalidade" },
    {
      key: "carga_horaria",
      label: "Carga Horária",
      render: (row: any) => (
        <Button variant="default" onClick={() => verCargaHoraria(row)}>
          Ver carga horária
        </Button>
      ),
    },
    {
      key: "professor",
      label: "Professores",
      render: (row: any) => (
        <Button variant="outline" onClick={() => verProfessores(row.professor)}>
          Ver
        </Button>
      ),
    },
    {
      key: "curso",
      label: "Cursos",
      render: (row: any) => (
        <Button variant="outline" onClick={() => verCursos(row.curso)}>
          Ver
        </Button>
      ),
    },
    {
      key: "acoes",
      label: "Ações",
      render: (row: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default" onClick={() => handleEdit(row)}>
            <IconEdit />
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(row)}>
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = disciplinasFiltradas.map((disciplina: Disciplina) => ({
    id: disciplina.id,
    nome: disciplina.nome,
    professor: Array.isArray(disciplina.professor) ? disciplina.professor : [],
    curso: Array.isArray(disciplina.curso_id) ? disciplina.curso_id : [],
    area_tecnologica: disciplina.area_tecnologica,
    aulas_teoricas: disciplina.aulas_teoricas,
    aulas_praticas: disciplina.aulas_praticas,
    modalidade: disciplina.modalidade,
    semestre: disciplina.semestre,
    qtd_aulas: disciplina.qtd_aulas,
    sigla: disciplina.sigla,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Disciplinas</h1>

          <div className="flex flex-wrap gap-2">
            <FilterSelect onCursoChange={setCursoSelecionado} cursoSelecionado={cursoSelecionado} />
            <Button onClick={handleAdd}>Criar Disciplina</Button>
          </div>
        </div>

        {loading && <p>Carregando disciplinas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}

        <DisciplinaModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={disciplinaSelecionada}
          onSave={handleSave}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          disciplina={disciplinaSelecionada}
        />

        {/* Professores */}
        <GenericModal
          open={modalProfessoresOpen}
          onOpenChange={setModalProfessoresOpen}
          title="Professores"
          description={
            <>
              Visualize os professores que ministram a disciplina{" "}
              <strong>{disciplinaSelecionada?.nome}</strong>
            </>
          }
          items={professoresSelecionados}
        />
        {/* Cursos */}
        <GenericModal
          open={modalCursosOpen}
          onOpenChange={setModalCursosOpen}
          title="Cursos"
          description={
            <>
              Visualize os cursos que possuem a disciplina{" "}
              <strong>{disciplinaSelecionada?.nome}</strong>
            </>
          }
          items={cursosSelecionados}
        />
        {/* Carga Horária */}
        <GenericModal
          open={modalCargaHorariaOpen}
          onOpenChange={setModalCargaHorariaOpen}
          title="Visualizar Carga Horária"
          description={
            <>
              Visualize a carga horária da disciplina{" "}
              <strong>{disciplinaSelecionada?.nome}</strong>
            </>
          }
          items={[
            `Aulas Teóricas: ${disciplinaSelecionada?.aulas_teoricas} aulas`,
            `Aulas Práticas: ${disciplinaSelecionada?.aulas_praticas} aulas`,
            `Quantidade de Aulas: ${disciplinaSelecionada?.qtd_aulas} aulas`,
          ]}
        />
      </Content>
    </Section>
  );
}
