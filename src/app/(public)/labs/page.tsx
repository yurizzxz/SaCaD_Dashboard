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

  return (
    <Section>
      <Content>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <h1 className="text-2xl font-medium">Lista de Laboratórios</h1>
          <Button onClick={handleAdd}>Novo Laboratório</Button>
        </div>

        {loadingLabs && <p>Carregando laboratórios...</p>}
        {errorLabs && <p className="text-red-500">{errorLabs}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {!loadingLabs &&
            !errorLabs &&
            labs.map((lab: Lab) => (
              <Card key={lab.id} className="border rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {lab.nome}
                  </CardTitle>
                  <CardDescription>
                    Capacidade: {lab.capacidade} alunos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 -mt-4">
                    <p>
                      <strong className="block">Curso Associado:</strong>{" "}
                      {lab.curso_associado}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p>
                      <strong>Equipamentos:</strong>
                    </p>
                    <ul>
                      {Object.entries(lab.equipamentos || {}).map(
                        ([equip, qtd]) => (
                          <li key={equip}>
                            {equip}: {qtd}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => handleEdit(lab)}
                  >
                    <IconEdit size={18} />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(lab)}
                  >
                    <IconTrash size={18} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

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
