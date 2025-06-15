"use client";
import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useHorarioHooks } from "@/hooks/horarios/actions";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal as HorarioModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { ModalProfessor } from "./professor-modal";

export default function Page() {
  const {
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
    setDeleteModalOpen,
    horarioSelecionado,
  } = useHorarioHooks();

  const columns = [
    { key: "Dia_Numero", label: "Data" },
    { key: "Data", label: "Dia da Semana" },
    { key: "Disciplina", label: "Disciplina" },
    { key: "Sala", label: "Sala" },
    { key: "Hora", label: "Hora" },
    {
      key: "Professor",
      label: "Professores",
      render: (row: any) => (
        <Button variant="outline" onClick={() => verProfessores(row.professor)}>
          Ver
        </Button>
      ),
    },
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
    Dia_Numero: `${horario.dia_numero}/${horario.mes}`,
    Data: `${horario.dia_semana}`,
    Hora: `${horario.hora_inicio} - ${horario.hora_fim}`,
    Disciplina: horario.disciplina,
    Professor: Array.isArray(horario.professor) ? horario.professor : [],
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

        <ModalProfessor
          horarioSelecionado={horarioSelecionado}
          professoresSelecionados={professoresSelecionados}
          modalProfessoresOpen={modalProfessoresOpen}
          setModalProfessoresOpen={setModalProfessoresOpen}
        />
      </Section>
    </Content>
  );
}
