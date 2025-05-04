"use client";
import { Content, Section } from "@/components/section";
import { DataTable } from "@/components/table/data-table";
import { Modal as SalaModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Sala } from "@/lib/types";
import { useSalasHooks } from "@/hooks/salas/actions";
import { FilterSelect } from "./filter";

export default function Page() {
  const {
    salas,
    loading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSave,
    modalOpen,
    setModalOpen,
    salaSelecionada,
    setSalaSelecionada,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useSalasHooks();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_sala", label: "Nome da Sala" },
    {
      key: "capacidade",
      label: "Capacidade",
      render: (row: any) => <>{row.capacidade} Alunos</>,
    },
    { key: "predio", label: "Predio" },
    { key: "bloco", label: "Bloco" },
    { key: "curso_associado", label: "Curso Associado" },
    {
      key: "equipamentosString",
      label: "Equipamentos",
      render: (row: any) => (
        <Button variant="default" onClick={() => handleEdit(row)}>
          Ver Equipamentos
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
  const data = salas.map((sala: Sala) => ({
    id: sala.id,
    nome_sala: sala.nome_sala,
    capacidade: sala.capacidade,
    curso_associado: sala.curso_associado,
    predio: sala.predio,
    bloco: sala.bloco,
    equipamentosString: Object.entries(sala.equipamentos || {})
      .filter(([equip, qtd]) => equip && qtd > 0)
      .map(([equip, qtd]: [string, number]) => `${equip}: ${qtd}`)
      .join(", "),
    equipamentos: sala.equipamentos,
  }));

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Salas</h1>
          <div className="flex gap-2 flex-wrap">
            <FilterSelect />
            <Button onClick={handleAdd}>Adicionar Sala</Button>
          </div>
        </div>

        {loading && <p>Carregando salas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <DataTable columns={columns} data={data} />}

        <SalaModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={salaSelecionada}
          onSave={handleSave}
        />
        <ConfirmDeleteModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          onConfirm={confirmDelete}
          sala={salaSelecionada}
        />
      </Content>
    </Section>
  );
}
