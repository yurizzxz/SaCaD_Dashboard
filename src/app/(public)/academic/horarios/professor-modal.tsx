"use client";
import { GenericModal } from "@/components/generic-modal";

interface horarioModalsProps {
  horarioSelecionado: any;
  professoresSelecionados: string[];
  modalProfessoresOpen: boolean;
  setModalProfessoresOpen: (open: boolean) => void;
}

export function ModalProfessor({
  horarioSelecionado,
  professoresSelecionados,
  modalProfessoresOpen,
  setModalProfessoresOpen,
}: horarioModalsProps) {
  return (
    <>
      <GenericModal
        open={modalProfessoresOpen}
        onOpenChange={setModalProfessoresOpen}
        title="Professores"
        description={
          <>
            Visualize os professores da disciplina{" "}
            <strong>{horarioSelecionado?.nome}</strong>
          </>
        }
        items={professoresSelecionados}
      />
    </>
  );
}
