"use client";
import { Content, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTable } from "@/components/table/data-table";
import { Modal as CursoModal } from "./actions/create-modal";
import { FilterSelect } from "./filter";
import { useCoursesHooks } from "@/hooks/courses/actions";

export default function Page() {
  const {
    cursos,
    loading,
    error,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    cursoSelecionado,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
  } = useCoursesHooks();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome" },
    { key: "sigla", label: "Sigla" },
    { key: "area_tecnologica", label: "Eixo Tecnológico" },
    { key: "periodo", label: "Turno" },
    { key: "modalidade", label: "Modalidade" },
    { key: "forma_oferecimento", label: "Forma de Oferecimento" },
    { key: "email_coordenador", label: "Email Coordenador" },
    {
      key: "disciplinas_id",
      label: "Disciplinas",
      render: (row: any) => <span>{row.disciplinas_id}</span>,
    },
    { key: "duracao_em_semestres", label: "Semestres" },
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

  const data = cursos.map((curso) => ({
    ...curso,
    id: curso.id,
    disciplinas_id: Array.isArray(curso.disciplinas_id)
      ? curso.disciplinas_id.length
      : 0,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Cursos</h1>

          <div className="flex flex-wrap gap-2">
            <FilterSelect />
            <Button onClick={handleAdd}>Adiconar Curso</Button>
          </div>
        </div>

        {loading && <p>Carregando cursos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <DataTable columns={columns} data={data} />

        <CursoModal
          open={modalOpen}
          setOpen={setModalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          initialData={cursoSelecionado}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          curso={cursoSelecionado}
        />
      </Content>
    </Section>
  );
}