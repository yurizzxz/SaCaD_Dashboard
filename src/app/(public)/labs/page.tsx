"use client";
import { Content, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal as LabModal } from "./actions/create-modal";
import { Laboratorio as Lab } from "@/lib/types";
import { useLabsHooks } from "@/hooks/labs/actions";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const {
    handleAdd,
    handleEdit,
    handleDelete,
    confirmDelete,
    labs,
    loadingLabs,
    errorLabs,
    handleSave,
    modalOpen,
    setModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    labSelecionado,
  } = useLabsHooks();

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "Nome do Laboratório" },
    { key: "capacidade", label: "Capacidade", render: (row: any) => (<>{row.capacidade} Alunos</>) },
    { key: "predio", label: "Predio" },
    { key: "bloco", label: "Bloco" },
    { key: "curso_associado", label: "Curso Associado" },
    {
      key: "equipamentosString",
      label: "Equipamentos",
      render: (row: any) => (
        <Button variant="default" onClick={() => handleEdit(row)}>Ver Equipamentos</Button>
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

  const data = labs.map((sala: Lab) => ({
    id: sala.id,
    nome: sala.nome,
    curso_associado: sala.curso_associado,
    predio: sala.predio,
    bloco: sala.bloco,
    capacidade: sala.capacidade,
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
          <h1 className="text-2xl font-medium">Lista de Laboratórios</h1>
          <Button onClick={handleAdd}>Novo Laboratório</Button>
        </div>

        {loadingLabs && <p>Carregando laboratórios...</p>}
        {errorLabs && <p className="text-red-500">{errorLabs}</p>}

        <DataTable columns={columns} data={data} />

        <LabModal
          open={modalOpen}
          setOpen={setModalOpen}
          onOpenChange={setModalOpen}
          onSave={handleSave}
          initialData={labSelecionado}
        />

        <ConfirmDeleteModal
          open={deleteModalOpen}
          onConfirm={confirmDelete}
          onOpenChange={setDeleteModalOpen}
          sala={labSelecionado}
        />
      </Content>
    </Section>
  );
}
