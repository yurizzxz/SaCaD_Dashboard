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
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCoursesFilter } from "@/hooks/useCoursesFilter";
import { DisciplinaModals } from "./disciplina-modals";

export default function Page() {
  const [cursoSelecionado, setCursoSelecionado] = useState("todos");
  const { cursos, getNomeCurso, getIdCurso } = useCoursesFilter();

  const [modalidadeSelecionada, setModalidadeSelecionada] = useState("todos");

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

  const cursoIdSelecionado = getIdCurso(cursoSelecionado);

  const disciplinasFiltradas = disciplinas.filter((disciplina) => {
    const correspondeCurso =
      cursoSelecionado === "todos" ||
      disciplina.curso_id.includes(cursoIdSelecionado!);

    const correspondeModalidade =
      modalidadeSelecionada === "todos" ||
      disciplina.modalidade === modalidadeSelecionada;

    return correspondeCurso && correspondeModalidade;
  });

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
            <FilterSelect
              onCursoChange={setCursoSelecionado}
              cursoSelecionado={cursoSelecionado}
              onModalidadeChange={setModalidadeSelecionada}
              modalidadeSelecionada={modalidadeSelecionada}
            />
            <Button onClick={handleAdd}>Criar Disciplina</Button>
          </div>
        </div>

        {loading && <p>Carregando disciplinas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:hidden gap-2 mb-6">
          {disciplinasFiltradas.map((disciplina) => (
            <Card key={disciplina.id}>
              <CardHeader>
                <CardDescription>ID: {disciplina.id}</CardDescription>
                <CardTitle className="text-lg">{disciplina.nome}</CardTitle>
                <CardDescription className="text-md">
                  Sigla: {disciplina.sigla}
                </CardDescription>
                <CardDescription className="text-md">
                  Semestre: {disciplina.semestre}
                </CardDescription>
                <CardDescription className="text-md">
                  Eixo Tecnológico: {disciplina.area_tecnologica}
                </CardDescription>
                <CardDescription className="text-md">
                  Modalidade: {disciplina.modalidade}
                </CardDescription>
                <CardDescription className="text-md mt-2">
                  Quantidade de Aulas: {disciplina.qtd_aulas}
                </CardDescription>
                <CardDescription className="text-md">
                  Aulas Teóricas: {disciplina.aulas_teoricas}
                </CardDescription>
                <CardDescription className="text-md">
                  Aulas Práticas: {disciplina.aulas_praticas}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => verProfessores(disciplina.professor)}
                >
                  Ver professores
                </Button>
                <Button
                  variant="outline"
                  onClick={() => verCursos(disciplina.curso_id)}
                >
                  Ver cursos
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleEdit(disciplina)}
                >
                  <IconEdit /> Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(disciplina)}
                >
                  <IconTrash /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <DataTable columns={columns} data={data} />
        </div>

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

        <DisciplinaModals
          disciplinaSelecionada={disciplinaSelecionada}
          professoresSelecionados={professoresSelecionados}
          cursosSelecionados={cursosSelecionados}
          modalProfessoresOpen={modalProfessoresOpen}
          setModalProfessoresOpen={setModalProfessoresOpen}
          modalCursosOpen={modalCursosOpen}
          setModalCursosOpen={setModalCursosOpen}
          modalCargaHorariaOpen={modalCargaHorariaOpen}
          setModalCargaHorariaOpen={setModalCargaHorariaOpen}
        />
      </Content>
    </Section>
  );
}
