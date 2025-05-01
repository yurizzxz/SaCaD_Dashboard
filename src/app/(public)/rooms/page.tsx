"use client";
import { Content, Section } from "@/components/section";
import { useSalas } from "@/hooks/useSalas";
import { DataTable } from "@/components/table/data-table";
import { Modal as SalaModal } from "./actions/create-modal";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function Page() {
  const { salas, loading, error, cadastrarSala, editarSala, excluirSala } =
    useSalas();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [salaSelecionada, setSalaSelecionada] = useState<any | null>(null);

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome_sala", label: "Nome da Sala" },
    { key: "capacidade", label: "Capacidade" },
    { key: "equipamentos", label: "Equipamentos" },
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

  const data = salas.map((sala: any) => ({
    id: sala.id,
    nome_sala: sala.nome_sala,
    capacidade: sala.capacidade,
    equipamentos: Object.entries(sala.equipamentos)
      .map(([equipamento, quantidade]) => `${equipamento}: ${quantidade}`)
      .join(", "),
  }));

  const handleAdd = () => {
    setSalaSelecionada(null);
    setModalOpen(true);
  };

  const handleEdit = (sala: any) => {
    setSalaSelecionada(sala);
    setModalOpen(true);
  };

  const handleDelete = (sala: any) => {
    setSalaSelecionada(sala);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (salaSelecionada?.id) {
      await excluirSala(salaSelecionada.id);
      setDeleteModalOpen(false);
      setSalaSelecionada(null);
    }
  };

  const handleSave = async (sala: any) => {
    if (sala.id) {
      await editarSala(sala.id, sala);
    } else {
      await cadastrarSala(sala);
    }
    setModalOpen(false);
    setSalaSelecionada(null);
  };

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Salas</h1>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleAdd}>
              Adicionar Sala
            </Button>
          </div>
        </div>

        {loading && <p>Carregando salas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <DataTable columns={columns} data={data} />
        )}

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
