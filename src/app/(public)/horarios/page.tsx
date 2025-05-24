"use client";
import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useHorarioHooks } from "@/hooks/horarios/actions";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal as HorarioModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";

export default function Page() {
  const {
    horarios,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    horarioSelecionado,
  } = useHorarioHooks();

  const columns = [
    { key: "Sala", label: "Sala" },
    { key: "Data", label: "Dia da Semana" },
    { key: "Hora", label: "Hora" },
    { key: "Disciplina", label: "Disciplina" },
    { key: "Professor", label: "Professor" },
    { key: "Turma", label: "Turma" },
    {
      key: "acoes",
      label: "Ações",
      render: (horario: any) => (
        <div className="flex justify-end gap-1.5">
          <Button onClick={() => handleEdit(horario)} variant="default">
            <IconEdit />
          </Button>
          <Button onClick={() => handleDelete(horario)} variant="destructive">
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = horarios.map((horario: any) => ({
    ...horario,
    id: horario.id,
    Sala: horario.sala,
    Data: `${horario.dia_semana}, ${horario.dia_numero}/${horario.mes}`,
    Hora: `${horario.hora_inicio} - ${horario.hora_fim}`,
    Disciplina: horario.disciplina,
    Professor: horario.professor,
    Turma: horario.turma,
  }));

  return (
    <Content>
      <Section>
        <div className="flex justify-between flex-wrap items-center ">

          <div className="flex flex-wrap col-gap gap-2">
            <Button onClick={handleAdd}>Adicionar Horário</Button>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>

        <HorarioModal
          open={modalOpen}
          setOpen={setModalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          initialData={horarioSelecionado}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          horario={horarioSelecionado}
        />
      </Section>
    </Content>
  );
}
