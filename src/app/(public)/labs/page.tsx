"use client";
import { Content, Section } from "@/components/section";
import { useLabs } from "@/hooks/useLabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConfirmDeleteModal } from "./actions/delete-modal";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Modal as LabModal } from "./actions/create-modal";
import { Laboratorio as Lab } from "@/lib/types";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const {
    labs,
    loading: loadingLabs,
    error: errorLabs,
    cadastrarLab,
    editarLab,
    excluirLab,
  } = useLabs();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [labSelecionado, setLabSelecionado] = useState<Lab | null>(null);

  const handleAdd = () => {
    setLabSelecionado(null);
    setModalOpen(true);
  };

  const handleEdit = (lab: Lab) => {
    setLabSelecionado(lab);
    setModalOpen(true);
  };

  const handleDelete = (lab: Lab) => {
    setLabSelecionado(lab);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (labSelecionado?.id) {
      await excluirLab(labSelecionado.id);
      setDeleteModalOpen(false);
      setLabSelecionado(null);
    }
  };

  const handleSave = async (lab: Lab) => {
    if (lab.id) {
      await editarLab(lab.id, lab);
    } else {
      await cadastrarLab(lab);
    }
    setModalOpen(false);
    setLabSelecionado(null);
  };

  const columns = [
      { key: "id", label: "ID" },
      { key: "nome", label: "Nome do Laboratório" },
      { key: "capacidade", label: "Capacidade"  },
      { key: "curso_associado", label: "Curso Associado" },
      { key: "equipamentosString", label: "Equipamentos" },      {
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
