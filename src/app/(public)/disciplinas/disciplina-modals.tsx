"use client";
import { GenericModal } from "@/components/generic-modal";
import { Disciplina } from "@/lib/types";

interface DisciplinaModalsProps {
  disciplinaSelecionada: Disciplina | null;
  professoresSelecionados: string[];
  cursosSelecionados: string[];
  modalProfessoresOpen: boolean;
  setModalProfessoresOpen: (open: boolean) => void;
  modalCursosOpen: boolean;
  setModalCursosOpen: (open: boolean) => void;
  modalCargaHorariaOpen: boolean;
  setModalCargaHorariaOpen: (open: boolean) => void;
}

export function DisciplinaModals({
  disciplinaSelecionada,
  professoresSelecionados,
  cursosSelecionados,
  modalProfessoresOpen,
  setModalProfessoresOpen,
  modalCursosOpen,
  setModalCursosOpen,
  modalCargaHorariaOpen,
  setModalCargaHorariaOpen,
}: DisciplinaModalsProps) {
  return (
    <>
      <GenericModal
        open={modalProfessoresOpen}
        onOpenChange={setModalProfessoresOpen}
        title="Professores"
        description={
          <>
            Visualize os professores da disciplina{" "}
            <strong>{disciplinaSelecionada?.nome}</strong>
          </>
        }
        items={professoresSelecionados}
      />

      <GenericModal
        open={modalCursosOpen}
        onOpenChange={setModalCursosOpen}
        title="Cursos"
        description={
          <>
            Visualize os cursos da disciplina{" "}
            <strong>{disciplinaSelecionada?.nome}</strong>
          </>
        }
        items={cursosSelecionados}
      />

      <GenericModal
        open={modalCargaHorariaOpen}
        onOpenChange={setModalCargaHorariaOpen}
        title="Visualizar Carga Horária"
        description={
          <>
            Carga horária da disciplina{" "}
            <strong>{disciplinaSelecionada?.nome}</strong>
          </>
        }
        items={[
          `Aulas Teóricas: ${disciplinaSelecionada?.aulas_teoricas} aulas`,
          `Aulas Práticas: ${disciplinaSelecionada?.aulas_praticas} aulas`,
          `Quantidade de Aulas: ${disciplinaSelecionada?.qtd_aulas} aulas`,
        ]}
      />
    </>
  );
}
