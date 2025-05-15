"use client";
import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useHorarioHooks } from "@/hooks/horarios/actions";
import { IconEdit, IconTrash } from "@tabler/icons-react";

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
    setHorarioSelecionado,
  } = useHorarioHooks();

  const columns = [
    { key: "Sala", label: "Sala" },
    { key: "Dia", label: "Dia" },
    { key: "Hora", label: "Hora" },
    { key: "Disciplina", label: "Disciplina" },
    { key: "Professor", label: "Professor" },
    { key: "Turma", label: "Turma" },
    {
      key: "acoes",
      label: "Ações",
      render: (horario: any) => (
        <div className="flex justify-end gap-1.5">
          <Button variant="default">
            <IconEdit />
          </Button>
          <Button variant="destructive">
            <IconTrash />
          </Button>
        </div>
      ),
    },
  ];

  const data = horarios.map((horario: any) => ({
    Sala: horario.sala,
    Dia: horario.dia,
    Hora: `${horario.hora_inicio} - ${horario.hora_fim}`,
    Disciplina: horario.disciplina,
    Professor: horario.professor,
    Turma: horario.turma,
  }));
  return (
    <Content>
      <Section>
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-medium mb-3 lg:mb-0">
            Tabela de horários
          </h1>

          <div className="flex flex-wrap col-gap gap-2">
            <Button>Adicionar Horário</Button>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </Section>
    </Content>
  );
}
